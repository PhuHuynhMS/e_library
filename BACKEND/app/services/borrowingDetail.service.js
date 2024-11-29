const borrowingDetailModel = require('../models/borrowingDetail.model');
const AccountService = require('./account.service');
const BookService = require('./book.service');
const StaffService = require('./staff.service');
const { ObjectId } = require('mongodb');
const { escapeRegex } = require('../utils/helper');

const accountService = new AccountService();
const bookService = new BookService();
const staffService = new StaffService();

class BorrowingDetailService {
    extractBorrowingData(payload) {
        const borrowingDetail = {
            book: payload.book_id,
            quantity: payload.quantity,
            reader: payload.reader_id,
            due_date: payload.due_date,
            status: payload.status,
            renewal_request_date: payload.renewal_request_date,
            borrowed_date: payload.borrowed_date,
            returned_date: payload.returned_date,
            issued_by: payload.issued_by,
        };
        Object.keys(borrowingDetail).forEach((key) => borrowingDetail[key] == undefined && delete borrowingDetail[key]);
        return borrowingDetail;
    }

    async create(payload) {
        const data = this.extractBorrowingData(payload);
        // const escapedBorowingDetail = escapeRegex(payload);
        const book = await bookService.findByCustomId(data.book);

        if (parseInt(book.book_quantity) < parseInt(data.quantity)) {
            throw new Error('Insufficient book quantity');
        }
        const result = await borrowingDetailModel.create(data);
        console.log('result: ', result);

        if (result) {
            // update book quantity
            await bookService.update(data.book, { book_quantity: book.book_quantity - data.quantity });
        }

        return result._id;
    }

    async getAllBorrowedDetails() {
        return await borrowingDetailModel.find({ returned_date: { $exists: false } });
    }

    async findById(id) {
        return await borrowingDetailModel
            .findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null })
            .populate({
                path: 'book',
                model: 'Book',
                localField: 'book',
                foreignField: 'book_id',
                populate: {
                    path: 'publisher_id',
                },
            })
            .populate({
                path: 'reader',
                model: 'Reader',
                localField: 'reader',
                foreignField: 'reader_id',
            })
            .populate({
                path: 'issued_by',
            });
    }

    async findBookIdById(id) {
        return await borrowingDetailModel.findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null }).populate({
            path: 'book',
            model: 'Book',
            localField: 'book',
            foreignField: 'book_id',
        });
    }

    //TODO: need to enhance
    async update(id, payload) {
        if (payload.status === 'RETURNED') {
            const book = await bookService.findByCustomId(payload.book_id);
            await bookService.update(payload.book_id, { book_quantity: book.book_quantity + payload.quantity });
        }
        const borrowingDetail = this.extractBorrowingData(payload);
        const escapedBorrowingDetail = escapeRegex(borrowingDetail);
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const options = { returnDocument: true };
        const updateDoc = {
            $set: escapedBorrowingDetail,
        };
        return await borrowingDetailModel.findOneAndUpdate(filter, updateDoc, options);
    }

    async delete(id) {
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const result = await borrowingDetailModel.deleteOne(filter);
        return result.deletedCount;
    }

    async deleteAll() {
        const result = await borrowingDetailModel.deleteMany({});
        return result.deletedCount;
    }

    async getByUserId(id) {
        const filter = { reader: id };
        return await borrowingDetailModel.find(filter).populate('book');
    }

    async getByStatus(status, id) {
        const filter = { status: status };
        const account = await accountService.getById(id);

        if (account.account_role === 'staff') {
            const borrowedList = await borrowingDetailModel
                .find(filter)
                .populate({
                    path: 'book',
                    model: 'Book',
                    localField: 'book',
                    foreignField: 'book_id',
                })
                .populate({
                    path: 'reader',
                    model: 'Reader',
                    localField: 'reader',
                    foreignField: 'reader_id',
                });
            return borrowedList;
        }
        const borrowedList = await borrowingDetailModel
            .find(filter)
            .populate({
                path: 'book',
                model: 'Book',
                localField: 'book',
                foreignField: 'book_id',
            })
            .populate({
                path: 'reader',
                match: { account_id: id },
                model: 'Reader',
                localField: 'reader',
                foreignField: 'reader_id',
            });
        return borrowedList.filter((item) => item.reader);
    }

    async getBorrowedDetails(id) {
        const filter = { returned_date: { $exists: false }, status: { $ne: 'PENDING' } };

        const account = await accountService.getById(id);

        if (account.account_role === 'staff') {
            const borrowedList = await borrowingDetailModel
                .find(filter)
                .populate({
                    path: 'book',
                    model: 'Book',
                    localField: 'book',
                    foreignField: 'book_id',
                })
                .populate({
                    path: 'reader',
                    model: 'Reader',
                    localField: 'reader',
                    foreignField: 'reader_id',
                });

            return borrowedList;
        }
        const borrowedList = await borrowingDetailModel
            .find(filter)
            .populate({
                path: 'book',
                model: 'Book',
                localField: 'book',
                foreignField: 'book_id',
            })
            .populate({
                path: 'reader',
                match: { account_id: id },
                model: 'Reader',
                localField: 'reader',
                foreignField: 'reader_id',
            });
        return borrowedList.filter((item) => item.reader);
    }

    async getReturnedBooks(id) {
        const filter = { returned_date: { $exists: true } };
        const account = await accountService.getById(id);

        if (account.account_role === 'staff') {
            const borrowedDetails = await borrowingDetailModel
                .find(filter)
                .populate({
                    path: 'book',
                    model: 'Book',
                    localField: 'book',
                    foreignField: 'book_id',
                })
                .populate({
                    path: 'reader',
                    model: 'Reader',
                    localField: 'reader',
                    foreignField: 'reader_id',
                });
            return borrowedDetails;
        }
        const borrowedDetails = await borrowingDetailModel
            .find(filter)
            .populate({
                path: 'book',
                model: 'Book',
                localField: 'book',
                foreignField: 'book_id',
            })
            .populate({
                path: 'reader_id',
                match: { account_id: id },
                model: 'Reader',
                localField: 'reader',
                foreignField: 'reader_id',
            });
        return borrowedDetails.filter((item) => item.reader);
    }

    async renew(payload, account_id) {
        const filter = { _id: ObjectId.isValid(payload._id) ? new ObjectId(payload._id) : null };
        const account = await accountService.getById(account_id);
        const options = { returnDocument: true };
        let status = 'PENDING';
        const data = { status: status };

        if (account.account_role === 'reader') {
            data.renewal_request_date = Date.now();
        }

        if (account.account_role === 'staff') {
            data.status = 'RENEWAL';
            data.due_date = payload.due_date;

            const staff = await staffService.getByAccountId(account_id);
            data.issued_by = staff._id;
        }
        const updateDoc = {
            $set: data,
        };
        return await borrowingDetailModel.findOneAndUpdate(filter, updateDoc, options);
    }

    async reject(payload, account_id) {
        const filter = { _id: ObjectId.isValid(payload._id) ? new ObjectId(payload._id) : null };
        const options = { returnDocument: true };
        let status = 'BORROWED';
        const data = { status: status };

        const updateDoc = {
            $set: data,
        };
        return await borrowingDetailModel.findOneAndUpdate(filter, updateDoc, options);
    }
}

module.exports = BorrowingDetailService;
