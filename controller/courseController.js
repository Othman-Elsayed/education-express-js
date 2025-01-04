const Course = require("../modules/CourseSchema");
const {
  createOne,
  dataOne,
  singleOne,
  deleteOne,
  updateOne,
} = require("../helper");

const getAllCourses = dataOne({ Schema: Course });
const createCourse = createOne({ Schema: Course });
const updateCourse = updateOne({ Schema: Course });
const deleteCourse = deleteOne({ Schema: Course, nameIdParam: "courseId" });
const getSingleCourse = singleOne({ Schema: Course, nameIdParam: "courseId" });

const controllers = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};

module.exports = controllers;
