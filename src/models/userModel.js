const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password:  {
        type: String,
        required: true
    },
    user_shop:  [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Shop' 
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
