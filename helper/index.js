const createOne = require("./createOne");
const dataOne = require("./dataOne");
const singleOne = require("./singleOne");
const deleteOne = require("./deleteOne");
const updateOne = require("./updateOne");
const belongsOne = require("./belongsOne");

const helpers = {
  createOne,
  dataOne,
  belongsOne,
  singleOne,
  deleteOne,
  updateOne,
};

module.exports = helpers;
