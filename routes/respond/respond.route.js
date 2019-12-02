const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const responses = require('../../controllers/respond/respond.controller');
const auth      = require('../../middleware/auth');

router.post('/:requestid', [
    check('subject', 'subject required').not().isEmpty(),
    check('text', 'text required').not().isEmpty()
], auth, responses.createResponse);
 
router.get('/', auth, responses.getAllRespond);

router.get('/:adminid', auth, responses.getAdminResponses);

router.get('/response/:respondid', auth, responses.getRespondById);

router.put('/:respondid', auth, responses.updateResponse);

router.delete('/:respondid', auth, responses.deleteResponse);

module.exports = router;