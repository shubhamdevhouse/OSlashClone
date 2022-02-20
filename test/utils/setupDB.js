const mongoose = require('mongoose');
const config = require('../../src/config/config');

const setupTestDB = () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    
  });


  afterAll(async () => {
    await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany()));
    await mongoose.disconnect();
  });
};

module.exports = setupTestDB;