const mongoose = require("mongoose");

const dbConnect = async () => {
  mongoose.connect(
    "mongodb+srv://othman:0DhQwY2pZM42kmwk@sabisway.knh3y.mongodb.net/sabisWay?retryWrites=true&w=majority&appName=sabisWay"
  );

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB:", err);
  });
};

module.exports = dbConnect;
