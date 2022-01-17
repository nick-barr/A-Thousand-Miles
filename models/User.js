const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    itineraries: [
        {
            type: Schema.Types.ObjectId,
            ref: "itineraries"
        }
    ]
}, {
    timestamps: true
})

module.exports = User = mongoose.model('users', UserSchema);