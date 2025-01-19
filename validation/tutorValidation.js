const { check } = require("express-validator");
const validatorMiddlewares = require("../middlewares/validatorMiddlewares");
const User = require("../modules/UserSchema");
const Tutor = require("../modules/TutorSchema");
const Subject = require("../modules/SubjectSchema");
const Student = require("../modules/StudentSchema");
const byId = [
  check("id")
    .notEmpty()
    .withMessage("id params is required.")
    .isMongoId()
    .withMessage("invalid id."),
  validatorMiddlewares,
];
const create = [
  check("userId")
    .notEmpty()
    .withMessage("'userId' is required.")
    .isMongoId()
    .withMessage("invalid 'userId'.")
    .custom(async (val) => {
      const findUser = await User.findById(val);
      if (!findUser) {
        throw new Error(`user dose not exist.`);
      }
      if (findUser?.status === "student") {
        throw new Error(`must be select account tutor.`);
      }
    })
    .custom(async (val) => {
      const findTutor = await Tutor.findOne({ userId: val });
      if (findTutor) throw new Error(`this tutor account already exist.`);
    })
    .custom(async (val) => {
      const findStudent = await Student.findOne({ userId: val });
      if (findStudent) throw new Error(`this student account already exist.`);
    }),
  check("subjects")
    .notEmpty()
    .withMessage("subjects ids is required.")
    .isArray()
    .withMessage("subjects ids must be array."),
  check("subjects.*")
    .isMongoId()
    .withMessage("Each subject id must be a valid id.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
  check("educations")
    .notEmpty()
    .withMessage("'educations' is required.")
    .isArray()
    .withMessage("'educations' must be array"),
  check("experiences")
    .notEmpty()
    .withMessage("'experiences' is required.")
    .isArray()
    .withMessage("'experiences' must be array"),
  check("startTutoring").notEmpty().withMessage("'startTutoring' is required."),
  validatorMiddlewares,
];

const update = [
  check("_id")
    .notEmpty()
    .withMessage("id body is required.")
    .isMongoId()
    .withMessage("invalid id.")
    .custom(async (val) => {
      const findStudent = await Tutor.findById(val);
      if (!findStudent) throw new Error(`tutor dose not exist.`);
    }),
  check("subjects")
    .optional()
    .isArray()
    .withMessage("subjects ids must be array."),
  check("subjects.*")
    .isMongoId()
    .withMessage("Each subject id must be a valid id.")
    .custom(async (id) => {
      const exists = await Subject.findById(id);
      if (!exists) {
        throw new Error(`Subject with ID ${id} does not exist.`);
      }
    }),
  check("educations")
    .optional()
    .isArray()
    .withMessage("'educations' must be array"),
  check("experiences")
    .optional()
    .isArray()
    .withMessage("'experiences' must be array"),
  validatorMiddlewares,
];

const remove = [
  check("id")
    .notEmpty()
    .withMessage("id params is required.")
    .isMongoId()
    .withMessage("invalid id."),
  validatorMiddlewares,
];

const validation = {
  byId,
  create,
  update,
  remove,
};
module.exports = validation;
