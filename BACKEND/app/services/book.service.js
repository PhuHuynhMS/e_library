const bookModel = require('../models/book.model');
const { ObjectId } = require('mongodb');
const { escapeRegex } = require('../utils/helper');
const PublisherService = require('./publisher.service');

const publisherService = new PublisherService();
class BookService {
    extractBookData(payload) {
        const book = {
            book_id: payload.book_id,
            book_name: payload.book_name,
            book_price: payload.book_price,
            book_quantity: payload.book_quantity,
            published_year: payload.published_year,
            publisher_id: payload.publisher_id,
            author: payload.author,
            image_url: payload.image_url,
        };
        Object.keys(book).forEach((key) => book[key] == undefined && delete book[key]);
        return book;
    }

    async create(payload) {
        const publisher = await publisherService.getByName(payload.publisher);
        if (!publisher) {
            throw new Error('Publisher not found');
        }
        payload.publisher_id = publisher._id;
        const book = this.extractBookData(payload);

        const lastBook = await bookModel.findOne({}).sort({
            createdAt: -1,
        });
        if (lastBook) {
            book.book_id = 'B' + (parseInt(lastBook.book_id.substr(1)) + 1);
        } else {
            book.book_id = 'B1001';
        }
        const escapedBook = escapeRegex(book);
        const result = await bookModel.create(escapedBook);
        return result.book_id;
    }

    async getAll() {
        return await bookModel.find({}).populate('publisher_id');
    }

    async findById(id) {
        return await bookModel
            .findOne({ _id: ObjectId.isValid(id) ? new ObjectId(id) : null })
            .populate('publisher_id');
    }

    async findByCustomId(id) {
        return await bookModel.findOne({ book_id: id });
    }

    async find(payload) {
        const escapedPayload = escapeRegex(this.extractBookData(payload));

        const filter = {
            $or: [],
        };

        if (payload.book_name) {
            filter.$or.push({ book_name: { $regex: new RegExp(escapedPayload.book_name), $options: 'i' } });
        }
        if (payload.published_year) {
            filter.$or.push({ published_year: escapedPayload.published_year });
        }
        if (payload.author) {
            filter.$or.push({ author: { $regex: new RegExp(escapedPayload.author), $options: 'i' } });
        }
        return await bookModel.find(filter);
    }

    async update(id, payload) {
        const book = this.extractBookData(payload);
        const escapedBook = escapeRegex(book);
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const options = { returnDocument: true };
        const updateDoc = {
            $set: escapedBook,
        };
        return await bookModel.findOneAndUpdate(filter, updateDoc, options);
    }

    async delete(id) {
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const result = await bookModel.deleteOne(filter);
        return result.deletedCount;
    }

    async deleteAll() {
        const result = await bookModel.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = BookService;
