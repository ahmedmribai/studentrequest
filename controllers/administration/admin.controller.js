const jwt = require("jsonwebtoken");
const config = require("config");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Admin = require("../../models/administration/admin.model");

// ========= creating admin =========
exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, password, jobTitle } = req.body;

  try {
    // ======= admin existence ======
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: "admin already exists" }] });
    }
    admin = new Admin({
      firstName,
      lastName,
      jobTitle,
      email,
      password
    });

    //============ encrypt password ======
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    await admin.save();

    const payload = {
      user: {
        id: admin.id,
        admin: true
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

//============== login admin =============
exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: admin.id,
        admin: true
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

// ======== get all admins ============
exports.getAllAdmins = async (req, res) => {
  try {
    // check if the user is admin
    if (req.user.admin) {
      const Admins = await Admin.find().select("-password");
      res.json(Admins);
    } else {
      return res.status(404).send("not authorized to do this");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

// =============== get a single admin ==========
exports.getAdminById = async (req, res) => {
  try {
    if (req.user.admin) {
      const admin = await Admin.findById(req.params.id).select("-password");
      res.json(admin);
    } else {
      return res.status(404).send("not authorized to do this");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

exports.getCurrent = async (req, res) => {
  try {
    if (req.user.admin) {
      const admin = await Admin.findById(req.user.id).select("-password");
      res.json(admin);
    } else {
      return res.status(404).send("not authorized to do this");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

// ================= update  admin ===================
const filterData = (adminField, bodyField) => {
  if (bodyField) {
    return bodyField;
  }
  return adminField;
};

exports.updateAdmin = async (req, res) => {
  try {
    if (req.user.admin) {
      const admin = await Admin.findById(req.params.id).select("-password");

      admin.firstName = filterData(admin.firstName, req.body.firstName);
      admin.lastName = filterData(admin.lastName, req.body.lastName);
      admin.email = filterData(admin.email, req.body.email);
      admin.password = filterData(admin.password, req.body.password);
      admin.jobTitle = filterData(admin.jobTitle, req.body.jobTitle);

      Admin.findByIdAndUpdate(req.params.id, admin, { new: true });
      res.json(admin);
    } else {
      return res.status(404).send("not authorized to do this");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

// ================= delete admin ==============
exports.deleteAdmin = async (req, res) => {
  try {
    if (req.user.admin) {
      const admin = await Admin.findByIdAndDelete(req.params.id).select(
        "-password"
      );
      res.json(admin);
    } else {
      return res.status(404).send("not authorized to do this");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};
