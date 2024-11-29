const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        book_id: {
            type: String,
            required: [true, 'BookId is required'],
            trim: true,
            unique: true,
        },
        book_name: {
            type: String,
            required: [true, 'Please enter book name!'],
            trim: true,
            minlength: [3, 'Book name have at least 3 characters!'],
            maxlength: [200, 'Book name have at most 200 characters!'],
        },
        book_price: {
            type: Number,
            required: [true, 'Please enter book price!'],
            min: [0, 'Price have at least 0!'],
        },
        book_quantity: {
            type: Number,
            required: [true, 'Please enter book quantity!'],
            min: [0, 'Quantity have at least 0!'],
        },
        published_year: {
            type: Number,
            required: [true, 'Please enter book published year!'],
        },
        publisher_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Publisher',
            required: [true, 'Please enter book publisher!'],
        },
        author: {
            type: String,
            required: [true, 'Please enter book author!'],
        },
        image_url: {
            type: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Book', bookSchema);
