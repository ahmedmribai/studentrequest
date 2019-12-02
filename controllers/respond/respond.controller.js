const {validationResult} = require('express-validator');

const Respond = require('../../models/respond/respond.model');
const Admin   = require('../../models/administration/admin.model');
const Request = require('../../models/request/studentRequest.model');

// ============== create a response ==============
exports.createResponse = async (req, res) => {
    const errors = validationResult(req);
    if( !errors.isEmpty()) {
        return res.status(400).json({ errors : errors.array()});
    }
    try{
        // check the existance of the user (admin)
        let admin = await Admin.findById(req.user.id);
        if(!admin){
            return res.status(404).send('admin with this id does not exist');
        }

        const requesttarget = Request.findById(req.params.requestid);
        if(!requesttarget){
            return res.status(404).send('request does not exist');
        }
        if(requesttarget.respond){
            return res.send('request already treated');
        }

        const respondObj = {
            subject : req.body.subject,
            text    : req.body.text,
            adminId : req.user.id,
            requestid : req.params.requestid
        }
        const respond = new Respond(respondObj);
        await respond.save();

        return res.json(respond);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}

// =============== get all responses of all admins =============
exports.getAllRespond = async (req, res) => {
    try {
        // check if the user is admin
        if (req.user.admin) {
            const Responses = await Respond.find();
            return res.json(Responses);
        } else {
            return res.status(404).send('not authorized to do this');
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
}

// ============== get all responses of a single admin  ==========================
exports.getAdminResponses = async (req, res) => {
    try {
        if (req.user.admin ) {
            const response = await Respond.find(req.params.adminId);
           
            return res.json(response);
        } else {
            return res.status(404).json('not authorised');
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server error');
    }
}
// ============== get a single respond by id ===================================
exports.getRespondById = async (req, res) => {
    try {
        if (req.user.admin ) {
            const response = await Respond.findById(req.params.respondid);
            console.log(response);
            return res.json(response);
        } else {
            return res.status(404).json('not authorised');
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send('server error');
    }
}

// ============== update a respond ==============================================
const filterData = (responseField, bodyField) => {
    if (bodyField) {
        return bodyField;
    }
    return responseField;
}    
exports.updateResponse = async (req, res) => {
    try{
        if(req.user.admin){
            const response = await Respond.findById(req.params.respondid);

            response.subject = filterData(response.subject, req.body.subject);
            response.text    = filterData(response.text, req.body.text);

            await Respond.findByIdAndUpdate(req.params.respondid, response, {new: true });
            return res.json(response);
        }else {
            return res.status(404).json('not authorised');
        }
    }catch(err){
        console.log(err.message);
        res.status(500).json('server error');
    }
}

// ============ delete a response =============================================
exports.deleteResponse = async (req, res) => {
    try{
        if(req.user.admin){
            const response = Respond.findById(req.params.respondid);
            if(!response){
                return res.status(404).send('response not found');
            }
            await Respond.findByIdAndDelete(req.params.respondid);
            return res.send({'msg':'response deleted'});
        }else {
            res.status(500).json('not authorised');
        }
    }catch(err){
        console.log(err.message);
        res.status(404).json('server error');
    }
}