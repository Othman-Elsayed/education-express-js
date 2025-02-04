const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.connect(process.env.DB_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error connecting to MongoDB:", err);
  });
};

module.exports = dbConnect;
