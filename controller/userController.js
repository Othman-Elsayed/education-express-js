const User = require("../modules/UserSchema");
const {
  dataOne,
  singleOne,
  updateOne,
  createOne,
  deleteOne,
} = require("../helper");

const getAllUsers = dataOne({ Schema: User });

const getSingleUser = singleOne({ Schema: User, nameIdParam: "userId" });
const createUser = createOne({ Schema: User });

const updateUser = updateOne({ Schema: User });
const deleteUser = deleteOne({ Schema: User, nameIdParam: "userId" });
const controllers = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};

module.exports = controllers;
