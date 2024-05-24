//model for the school carreer
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SchoolPSchema = new Schema ({
    diploma: {
        type: String,
        required: true,
    },
    schoolName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    yearStart: {
        type: String,
        required: true,
    },
    yearEnd: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('SchoolP', SchoolPSchema);
