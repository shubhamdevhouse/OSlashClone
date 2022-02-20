const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');


mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    server = app.listen(config.port, () => {
    });
  });