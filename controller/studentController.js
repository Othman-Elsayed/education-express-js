const Student = require("../modules/StudentSchema");
const {
  createOne,
  dataOne,
  singleOne,
  deleteOne,
  updateOne,
} = require("../helper");

const getAllStudents = dataOne({ Schema: Student });
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
