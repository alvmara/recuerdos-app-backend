const mongoose = require("mongoose");

module.exports = async function initialize() {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
}