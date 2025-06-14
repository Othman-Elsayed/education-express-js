const allowedOrigins = require("./allowedOrigins"); // Adjust the path as needed

const corsOptions = {
  // origin: (origin, callback) => {
  //   // Allow requests with no 'Origin' header (like those from Postman)
  //   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
