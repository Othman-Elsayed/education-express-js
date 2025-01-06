const Student = require("../modules/StudentSchema");
const {
  createOne,
  dataOne,
  singleOne,
  deleteOne,
  updateOne,
} = require("../helper");

const getAllStudents = dataOne({
  Schema: Student,
  margeObj: "userId",
  populateName: "userId",
  populateSelect: "firstName lastName age email phoneNumber gander avatar -_id",
});
const createStudent = createOne({ Schema: Student });
const updateStudent = updateOne({ Schema: Student });

const deleteStudent = deleteOne({ Schema: Student, nameIdParam: "studentId" });
const getSingleStudent = singleOne({
  Schema: Student,
  nameIdParam: "studentId",
});

const controllers = {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
};

module.exports = controllers;
