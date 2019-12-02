const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    subject     : {type : String,required: true},
    text        : {type : String,required: true},
    studentid   : {type : String,required: true},
    respond     : {
        type : Boolean,
        default : false,
        required : true
    }    
},{
    timestamps: true
});

module.exports = mongoose.model('Request', requestSchema);