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

const getAllSubjects = asyncHandler(async (_, res) => {
  const data = await Subject.find();
  return res.json(new ApiSuccess(data, "fetch subjects successfully"));
});
const createSubject = createOne({ Schema: Subject });
const updateSubject = updateOne({ Schema: Subject });
const deleteSubject = deleteOne({ Schema: Subject, nameIdParam: "subjectId" });
const getSingleSubject = singleOne({
  Schema: Subject,
  nameIdParam: "subjectId",
});

const controllers = {
  getAllSubjects,
  createSubject,
  updateSubject,
  deleteSubject,
  getSingleSubject,
};

module.exports = controllers;
