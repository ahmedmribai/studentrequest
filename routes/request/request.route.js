const express = require('express');
const router = express.Router();

const {check} = require('express-validator');

const messages = require('../../controllers/request/request.controller');
const auth = require('../../middleware/auth');

router.post('/request', [
    check('subject', 'subject is required').not().isEmpty(),
    check('text', 'text message required').not().isEmpty(),
    check('studentid', 'studentid message required').not().isEmpty()
], auth, messages.createMessage);

router.get('/', auth, messages.getAllRequest);

router.get('/student/:studentid', auth, messages.getStudentRequests);

router.get('/request/:requestid', auth, messages.getRequestById);

router.put('/:requestid', auth, messages.updateRequest);

router.delete('/:requestid', auth, messages.deleteRequest);

module.exports = router; 