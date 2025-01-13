const Subject = require("../modules/SubjectSchema");
const asyncHandler = require("express-async-handler");
const {
  createOne,
  dataOne,
  singleOne,
  deleteOne,
  updateOne,
} = require("../helper");
const ApiSuccess = require("../utils/apiSuccess");

const getAllSubjects = asyncHandler(async (req, res) => {
  const data = await Subject.find();
  return res.json(new ApiSuccess(data, "fetch subjects successfully"));
});
const createSubject = asyncHandler(async (req, res) => {
  const payload = new Employee({});
  if (req.file) {
  }
  const data = await Subject.create(payload);
  return res.json(new ApiSuccess(data, "fetch subjects successfully"));
});
const updateSubject = () => {};
const deleteSubject = () => {};
const getSingleSubject = () => {};

const controllers = {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getSingleSubject,
};

module.exports = controllers;
