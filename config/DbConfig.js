const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.DB_URI;

const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      connectTimeoutMS: 20000,
    });
    console.log("Mongodb Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
