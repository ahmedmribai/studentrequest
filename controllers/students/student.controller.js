const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Student = require("../../models/students/student.model");

// ============== creating the student's database =============
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password } = req.body;

  try {
    // ======= student existence ======
    let student = await Student.findOne({ email });
    if (student) {
      return res
        .status(400)
        .json({ errors: [{ msg: "student already exists" }] });
    }
    student = new Student({
      firstName,
      lastName,
      email,
      password
    });

    //============ encrypt password ======
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(password, salt);
    await student.save();

    const payload = {
      user: {
        id: student.id,
        student: true
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
};

//============== login student =============
exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let student = await Student.findOne({ email });

    if (!student) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: student.id,
        student: true
      }
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

// ======== get all students ============
exports.getAllStudents = async (req, res) => {
  try {
    // check if the user is admin
    if (req.user.admin) {
      const Students = await Student.find().select("-password");
      res.json(Students);
    } else {
      return res.status(404).send("not authorized to do this");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};
 
// =============== get a single student ==========
exports.getStudentById = async (req, res) => {
  try {
    if (req.user.admin || req.params.id == req.user.id) {
      const student = await Student.findById(req.params.id).select("-password");
      res.json(student);
    } else {
      return res.status(404).json("not authorized to do this");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

exports.getCurrent = async (req, res) => {
  try {
    if (req.user.student) {
      const student = await Student.findById(req.user.id).select("-password");
      res.json(student);
    } else {
      return res.status(404).json("not authorized to do this");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error"); 
  } 
};

// ================= update a student ===================
const filterData = (studentField, bodyField) => {
  if (bodyField) {
    return bodyField;
  }
  return studentField;
};

exports.updateStudent = async (req, res) => {
  try {
    if (req.user.student) {
      const student = await Student.findById(req.params.id).select("-password");

      student.firstName = filterData(student.firstName, req.body.firstName);
      student.lastName = filterData(student.lastName, req.body.lastName);
      student.birthDate = filterData(student.birthDate, req.body.birthDate);
      student.email = filterData(student.email, req.body.email);
      student.password = filterData(student.password, req.body.password);
      student.classroom = filterData(student.classroom, req.body.classroom);
      student.registerNumber = filterData(
        student.registerNumber,
        req.body.registerNumber
      );

      Student.findByIdAndUpdate(req.params.id, student, { new: true });
      res.json(student);
    } else {
      return res.status(404).send("not authorized to do this");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

// ================= delete a student ==============
exports.deleteStudent = async (req, res) => {
  try {
    if (req.user.id == student.id) {
      const student = await Student.findByIdAndDelete(req.params.id).select(
        "-password"
      );
      res.json(student);
    } else {
      return res.status(404).send("not authorized to do this");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};
