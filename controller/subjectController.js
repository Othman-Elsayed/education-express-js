const Subject = require("../modules/SubjectSchema");
const {
  createOne,
  dataOne,
  singleOne,
  deleteOne,
  updateOne,
} = require("../helper");

const getAllSubjects = dataOne({ Schema: Subject });
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
