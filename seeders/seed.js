const db = require('../config/connection');
const { User} = require('../models');
const {Review } = require('../models')
const userSeeds = require('./userSeeds.json');
const companySeeds = require('./companySeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Review.deleteMany({});
    await Review.create(companySeeds);

    console.log('all done!');
    process.exit(0);

  } catch (err) {
    throw err;
  }
});
