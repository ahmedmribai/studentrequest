const mongoose = require('mongoose');

const respondSchema = mongoose.Schema({
    subject : {type: String, required: true},
    text    : {type: String, required: true},
    adminId : {type: String, required: true},
    requestid : {
        type: String,
        required: true
    }
},{
    timestamps : true
});

module.exports = mongoose.model('Respond', respondSchema);