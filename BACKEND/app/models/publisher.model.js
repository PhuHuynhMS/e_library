const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema(
    {
        publisher_name: {
            type: String,
            required: [true, 'Please enter publisher name!'],
            trim: true,
            unique: true,
            minlength: [3, 'Publisher name have at least 3 characters!'],
            maxlength: [200, 'Publisher name have at most 200 characters!'],
        },
        publisher_address: {
            type: String,
            required: [true, 'Please enter publisher address!'],
            trim: true,
            minlength: [3, 'Publisher address have at least 3 characters!'],
            maxlength: [200, 'Publisher address have at most 200 characters!'],
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Publisher', publisherSchema);
