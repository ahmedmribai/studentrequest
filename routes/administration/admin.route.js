const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const admins = require("../../controllers/administration/admin.controller");
const auth = require("../../middleware/auth");

router.post(
  "/signup",
  [
    check("firstName", "first name is required")
      .not()
      .isEmpty(),
    check("lastName", "last name is required")
      .not()
      .isEmpty(),
    check("email", "valid email is required").isEmail(),
    check("password", "enter a password with 6 or more characters").isLength({
      min: 6
    })
  ],
  admins.signup
);

router.post(
  "/login",
  [
    check("email", "enter a valid email").isEmail(),
    check("password", "enter a password with 6 or more characters").isLength({
      min: 6
    })
  ],
  admins.signin
);

router.get("/", auth, admins.getAllAdmins);

router.get("/:id", auth, admins.getAdminById);

router.get("/single/currentaccount", auth, admins.getCurrent);

router.put("/:id", auth, admins.updateAdmin);

router.delete("/:id", auth, admins.deleteAdmin);

module.exports = router;
