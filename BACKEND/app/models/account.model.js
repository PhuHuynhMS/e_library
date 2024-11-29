const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema(
    {
        account_name: {
            type: String,
            required: [true, 'Please enter account name!'],
            trim: true,
            unique: true,
            minlength: [3, 'Account name have at least 3 characters!'],
            maxlength: [200, 'Account name have at most 200 characters!'],
        },
        account_password: {
            type: String,
            required: [true, 'Please enter account password!'],
            minlength: [8, 'Password must be at least 8 characters long!'],
        },
        account_role: {
            type: String,
            enum: {
                values: ['staff', 'reader', 'admin'],
                message: '{Value} role is invalid!',
            },
            default: 'reader',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Account', accountSchema);
