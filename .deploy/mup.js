module.exports = {
  servers: {
    one: {
      host: '134.209.243.1',
      username: 'root',
      password: '2h5Rqp63rVSQueVE'
    }
  },
  meteor: {
    name: 'carSharingReact',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      PORT: 3000,
      MONGO_URL: 'mongodb://localhost/meteor',
      ROOT_URL: 'http://134.209.243.1'
    },
    dockerImage: 'abernix/meteord:node-8-base',
    deployCheckWaitTime: 120,
    enableUploadProgressBar: true
  },
  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
