const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let stackSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    imglink: {
        type: String,
        required: true,
    },
    pourcentage: {
        type: Number,
    }

});

module.exports = mongoose.model('Stack', stackSchema);
