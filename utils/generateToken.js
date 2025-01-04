const jwt = require("jsonwebtoken");
const generateAccessToken = (infoSave) => {
  return jwt.sign({ data: infoSave }, process.env.ACCESS_JWT_TOKEN, {
    expiresIn: "2m",
  });
};
const generateRefreshToken = (infoSave) => {
  return jwt.sign({ data: infoSave }, process.env.REFRESH_JWT_TOKEN, {
    expiresIn: "7d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
