const mongoose = require('mongoose');

const readerSchema = new mongoose.Schema(
    {
        reader_id: {
            type: String,
            required: [true, 'Please provide a reader id'],
            trim: true,
            unique: true,
        },
        reader_firstname: {
            type: String,
            required: [true, 'Please enter reader first name!'],
            trim: true,
            minlength: [3, 'Reader first name have at least 3 characters!'],
            maxlength: [200, 'Reader first name have at most 200 characters!'],
        },
        reader_lastname: {
            type: String,
            required: [true, 'Please enter reader last name!'],
            trim: true,
            minlength: [3, 'Reader last name have at least 3 characters!'],
            maxlength: [200, 'Reader last name have at most 200 characters!'],
        },
        reader_birthday: {
            type: Date,
            required: [true, 'Please enter reader birthday!'],
            default: Date.now(),
        },
        reader_gender: {
            type: String,
            required: [true, 'Please enter reader gender!'],
            enum: {
                values: ['male', 'female', 'other'],
                message: '{Value} role is invalid!',
            },
        },
        reader_address: {
            type: String,
            required: [true, 'Please enter reader address!'],
            trim: true,
        },
        reader_phone: {
            type: String,
            required: [true, 'Please enter reader phone!'],
            trim: true,
            minlength: [10, 'Phone number must be 10 characters long!'],
            maxlength: [10, 'Phone number must be 10 characters long!'],
        },
        account_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: [true, 'Please enter account id!'],
        },
    },

    { timestamps: true },
);

module.exports = mongoose.model('Reader', readerSchema);
