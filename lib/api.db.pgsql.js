'use strict';

// PgSQL database plugin for Impress Application Server

if (api.pgsql) {

  api.db.pgsql = {};
  api.db.drivers.pgsql = api.pgsql;

  api.db.pgsql.open = (
    database, // { name, url, tables }
    callback // callback after connection established
    // Example: {
    //   name: 'databaseName',
    //   url: 'postgres://username:password@host/database',
    //   tables: ['table1', 'table2', ...]
    // }
  ) => {
    database.retryCounter++;
    const application = database.application;
    const connection = new api.pgsql.Client(database.url);
    connection.slowTime = database.slowTime;

    // api.db.pgsql.upgrade(connection);

    connection.connect((err) => {
      if (err) {
        application.log.error(api.json.stringify(err));
        api.timers.setTimeout(() => {
          if (database.retryCounter <= database.retryCount) {
            api.db.pgsql.open(database, callback);
          }
        }, database.retryInterval);
      }
      database.retryCounter = 0;
    });

    connection.on('query', (err, res, query) => {
      if (err) {
        application.log.error(
          'PgSQL Error[' + err.code + ']: ' + err.toString() + '\t' + query.text
        );
      }
      application.log.debug(query.text);
    });

    connection.on('slow', (err, res, query, executionTime) => {
      application.log.slow(executionTime + 'ms\t' + query.text);
    });

    connection.on('error', (err) => {
      application.log.error(api.json.stringify(err));
    });

    database.connection = connection;
    callback();
  };

  api.db.pgsql.upgrade = (connection) => {

    connection.slowTime = 2000;

    api.common.override(connection, function query(sql, values, callback) {
      const startTime = Date.now();
      if (typeof(values) === 'function') {
        callback = values;
        values = [];
      }
      const aQuery = query.inherited(sql, values, (err, res) => {
        const endTime = Date.now();
        const executionTime = endTime - startTime;
        connection.emit('query', err, res, aQuery);
        if (connection.slowTime && executionTime >= connection.slowTime) {
          connection.emit('slow', err, res, aQuery, executionTime);
        }
        if (callback) callback(err, res);
      });
      return aQuery;
    });

  };

  api.db.pgsql.schema = {};

  api.db.pgsql.schema.generateScript = (
    databaseSchema, // relational database schema for PgSQL
    consoleOutput // eslint-disable-line
  ) => { };

  api.db.pgsql.schema.executeScript = (
    target, // eslint-disable-line
    script, // eslint-disable-line
    callback // eslint-disable-line
  ) => { };

}
