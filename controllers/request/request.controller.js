const { validationResult } = require("express-validator");

const Request = require("../../models/request/studentRequest.model");
const Student = require("../../models/students/student.model");

// ==================== create the message ===================
exports.createMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (req.user.student) {
      // check if the user exist:
      let student = await Student.findById(req.user.id);
      if (!student) {
        return res.status(404).json("student with this id does not exist");
      }

      const requestObj = {
        subject: req.body.subject,
        text: req.body.text,
        studentid: req.user.id
      };

      const request = new Request(requestObj);
      await request.save();
      return res.json(request);
    } else {
      res.send("not authorised");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

// =============== get all requests of all students =============
exports.getAllRequest = async (req, res) => {
  try {
    // check if the user is admin
    if (req.user.admin) {
      const Requests = await Request.find();
      res.json(Requests);
    } else {
      return res.status(404).send("not authorized to do this");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

// ============== get all requests of a single student  ===============================
exports.getStudentRequests = async (req, res) => {
  try {
    if (req.user.admin || req.user.student) {
      if (req.user.student) {
        if (req.user.id !== req.params.studentid)
          return res.status(404).send("not authorised");
      }
      const requests = await Request.find({ studentid: req.params.studentid });

      return res.json(requests);
    } else {
      return res.status(404).json("not authorised");
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("server error");
  }
};

// ============== get a single request by id ================  ===============
exports.getRequestById = async (req, res) => {
  try {
    if (req.user.admin || req.user.student) {
      const request = await Request.findById(req.params.requestid);

      if (!request) {
        res.status(404).send("request with this id does not exist");
      }

      if (req.user.student) {
        if (req.user.id !== request.studentid)
          return res.status(404).send("not authorised");
      }

      return res.json(request);
    } else {
      res.status(404).json("not authorised");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
};

// ============== update a request ==============================================
const filterData = (requestField, bodyField) => {
  if (bodyField) {
    return bodyField;
  }
  return requestField;
};
exports.updateRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestid);

    if (request.studentid === req.user.id) {
      request.subject = filterData(request.subject, req.body.subject);
      request.text = filterData(request.text, req.body.text);

      await Request.findByIdAndUpdate(req.params.requestid, request, {
        new: true
      });
      return res.json(request);
    } else {
      return res.status(404).json("not authorised");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json("server error");
  }
};

// ============ delete a request =============================================
exports.deleteRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.requestid);
    if (!request) {
      return res.status(404).send("request not found");
    }
    if (request.studentid == req.user.id) {
      await Request.findByIdAndDelete(req.params.requestid);
      return res.json({ msg: "request deleted" });
    } else {
      return res.status(500).json("not authorised");
    }
  } catch (err) {
    console.log(err.message);
    res.status(404).json("server error");
  }
};
