//model for the school carreer
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let profPSchema = new Schema ({
    profesion: {
        type: String,
        required: true,
    },
    companyName: {
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
    },
    description: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('profP', profPSchema);
