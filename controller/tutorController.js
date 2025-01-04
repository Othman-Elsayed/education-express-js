const Tutor = require("../modules/TutorSchema");
const Subject = require("../modules/SubjectSchema");
const {
  createOne,
  dataOne,
  singleOne,
  deleteOne,
  updateOne,
  belongsOne,
} = require("../helper");

const getAllTutor = dataOne({
  Schema: Tutor,
  populateName: "subjectIds",
  populateSelect: "name avatar -_id",
});
const createTutor = createOne({ Schema: Tutor });
const updateTutor = updateOne({ Schema: Tutor });
const deleteTutor = deleteOne({ Schema: Tutor, nameIdParam: "userId" });
const getSingleTutor = singleOne({ Schema: Tutor, nameIdParam: "userId" });
const getTutorSubjects = belongsOne({
  Schema: Subject,
  nameSearch: "tutorId",
  nameIdParam: "tutorId",
});

const controllers = {
  getAllTutor,
  getTutorSubjects,
  getSingleTutor,
  createTutor,
  updateTutor,
  deleteTutor,
};

module.exports = controllers;
