const express = require("express");
const router = express.Router();

const { check } = require("express-validator");

const students = require("../../controllers/students/student.controller");
const auth = require("../../middleware/auth");

router.post(
  "/signup",
  [
    check("firstName", "First name is required")
      .not()
      .isEmpty(),
    check("lastName", "Last name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "enter a password with 6 or more characters").isLength({
      min: 6
    })
  ],
  students.signup
);

router.post(
  "/signin",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "enter a password with 6 or more characters").isLength({
      min: 6
    })
  ],
  students.signin
);

router.get("/", auth, students.getAllStudents);

router.get("/:id", auth, students.getStudentById);

router.get("/single/currentaccount", auth, students.getCurrent);

router.put("/:id", auth, students.updateStudent);

router.delete("/:id", auth, students.deleteStudent);

module.exports = router;
