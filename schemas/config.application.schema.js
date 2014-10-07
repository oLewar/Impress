module.exports = {

  database: {
    url:         'string',
    collections: 'array',
    slowTime:    'number',
    security:    'boolean'
  },

  files: {
    minify:           'boolean',
    static:           'array',
    cacheSize:        'number',
    cacheMaxFileSize: 'number',
  },

  log: {
    keepDays:       'number',
    writeInterval:  'string',
    writeBuffer:    'number',
    applicationLog: 'boolean',
    serverLog:      'boolean'
  },

  mail: {
    enabled: 'boolean',
    robot:   'string',
    options: '{mailOptions}'
  },

  mailOptions: {
    service: 'string',
    auth:    '{mailAuth}'
  },

  mailAuth: {
    user: 'string',
    pass: 'string'
  },

  routes: '{{route}}',

  route: {
    url:      'string',
    rewrite:  'string',
    escaping: 'boolean'
  },

  sessions: {
    anonymous:  'boolean',
    cookie:     'string',
    characters: 'string',
    secret:     'string',
    length:     'number',
    persist:    'boolean',
    database:   'string'
  },

};
