const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("success connection db");
  } catch (err) {
    console.log("error connection db ->", err);
  }
};

module.exports = dbConnect;
