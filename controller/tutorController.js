const Tutor = require("../modules/TutorSchema");
const {
  createOne,
  dataOne,
  singleOne,
  deleteOne,
  updateOne,
} = require("../helper");

const getAllTutor = dataOne({
  Schema: Tutor,
  margeObj: "userId",
  populateName: "subjectIds userId",
  populateSelect:
    "firstName lastName age email phoneNumber gander name avatar -_id",
});
const createTutor = createOne({ Schema: Tutor });
const updateTutor = updateOne({ Schema: Tutor });
const deleteTutor = deleteOne({ Schema: Tutor, nameIdParam: "userId" });
const getSingleTutor = singleOne({
  Schema: Tutor,
  populateName: "subjectIds",
  populateSelect: "name avatar -_id",
  nameIdParam: "userId",
});
const getTutorSubjects = singleOne({
  Schema: Tutor,
  nameIdParam: "tutorId",
  populateName: "subjectIds",
  populateSelect: "name avatar -_id",
  returnOne: "subjectIds",
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
