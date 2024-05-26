const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let shopSchema = new Schema ({
    foods_in_shop:  [{ 
        type: mongoose.Types.ObjectId, 
        ref: 'Food' 
    }],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Shop', shopSchema);
