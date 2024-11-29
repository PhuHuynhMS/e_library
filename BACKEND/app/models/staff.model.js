const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema(
    {
        staff_id: {
            type: String,
            required: [true, 'Please enter staff id'],
        },
        staff_name: {
            type: String,
            required: [true, 'Please enter staff name!'],
            trim: true,
            minlength: [3, 'Staff name have at least 3 characters!'],
        },
        staff_role: {
            type: String,
            required: [true, 'Please enter staff role!'],
            enum: {
                values: ['staff', 'manager'],
                message: '{Value} role is invalid!',
            },
        },
        staff_address: {
            type: String,
            require: [true, 'Please enter staff address!'],
            trim: true,
        },
        staff_phone: {
            type: String,
            require: [true, 'Please enter staff phone!'],
            length: [10, 'Phone number must be 10 characters long!'],
            trim: true,
        },
        account_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: [true, 'Please enter account id!'],
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Staff', staffSchema);
