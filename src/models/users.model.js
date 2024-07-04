const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        password: {
            type: String,
            required: true,
        },

        isAdmin: {
            type: Boolean,
            default: false
            
        }
    }, { timestamps: true }
);

const User = model('User', UserSchema);

module.exports = User;