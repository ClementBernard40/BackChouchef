const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let contactSchema = new Schema ({
    adress: {
        type: String,
        required: true,
    },
    pCode: {
        type: String,
        required: true,
    },
    city:  {
        type: String,
        required: true,
    },
    email:  {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    gitLink: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Contact', contactSchema);
