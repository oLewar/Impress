{

  master: {
    protocol:  'jstp',
    transport: 'tcp',
    address:   '127.0.0.1',
    ports:     [2500],
    slowTime:  '1s'
  },

  www: {
    protocol:  'http',
    transport: 'tcp',
    address:   '127.0.0.1',
    ports:     [8080],
    nagle:     true,
    slowTime:  '1s',
    timeout:   '10s'
  },

  rpc: {
    protocol:  'jstp',
    transport: 'tcp',
    address:   '127.0.0.1',
    ports:     [3000],
    slowTime:  '1s'
  },

  webRpc: {
    protocol:  'jstp',
    transport: 'ws',
    address:   '127.0.0.1',
    ports:     [5000],
    nagle:     true,
    slowTime:  '1s'
  }

}
