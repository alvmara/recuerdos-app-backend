const mongoose = require("mongoose");

module.exports = async function initialize() {

  console.log("Initializing database connection to: ", process.env.DATABASE_URL);
  await mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}