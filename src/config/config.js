module.exports = {
    port: 3000,
    url:"127.0.0.1",
    mongoose:{
        url: 'mongodb://127.0.0.1:27017',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: '0i@$hSECRETKEY',
        accessExpirationMinutes: '60',
      
      },
  };