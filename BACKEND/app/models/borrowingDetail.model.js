const mongoose = require('mongoose');

const borrowingDetailSchema = new mongoose.Schema(
    {
        book: {
            type: String,
            ref: 'Book',
            required: [true, 'Please enter book id!'],
            validate: {
                validator: function (value) {
                    const exists = this.model('Book').exists({ book_id: value });
                    return exists;
                },
                message: 'Book ID does not exist.',
            },
        },
        quantity: {
            type: Number,
            required: [true, 'Please enter quantity!'],
            min: [0, 'Quantity have at least 0!'],
        },
        reader: {
            type: String,
            ref: 'Reader',
            required: [true, 'Please enter reader id!'],
            validate: {
                validator: function (value) {
                    const exists = this.model('Reader').exists({ reader_id: value });
                    return exists;
                },
                message: 'Reader ID does not exist.',
            },
        },
        borrowed_date: {
            type: Date,
            required: [true, 'Please enter borrowed date!'],
        },
        status: {
            type: String,
            required: [true, 'Please enter status'],
            enum: {
                values: ['PENDING', 'BORROWED', 'OVERDUE', 'RENEWAL'],
            },
        },
        renewal_request_date: {
            type: Date,
        },
        due_date: {
            type: Date,
            required: [true, 'Due date is required'],
        },
        returned_date: {
            type: Date,
        },
        issued_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Staff',
            required: [true, 'Please enter staff id!'],
        },
    },
    { timestamps: true },
);

borrowingDetailSchema.index({ book_id: 1, reader_id: 1, borrowed_date: 1 }, { unique: true });

module.exports = mongoose.model('BorrowingDetail', borrowingDetailSchema);
