const readerModel = require('../models/reader.model');
const { ObjectId } = require('mongodb');
const { escapeRegex } = require('../utils/helper');
class ReaderService {
    extractReaderData(payload) {
        const reader = {
            reader_firstname: payload.reader_firstname,
            reader_lastname: payload.reader_lastname,
            reader_birthday: payload.reader_birthday,
            reader_gender: payload.reader_gender,
            reader_address: payload.reader_address,
            reader_phone: payload.reader_phone,
            account_id: payload.account_id,
        };
        Object.keys(reader).forEach((key) => reader[key] == undefined && delete reader[key]);
        return reader;
    }

    async create(payload) {
        try {
            const reader = this.extractReaderData(payload);

            const lastReader = await readerModel.findOne({}).sort({
                createdAt: -1,
            });

            if (lastReader) {
                const lastReaderId = lastReader.reader_id.toString();
                const insertedId = parseInt(lastReaderId.substr(1)) + 1;
                reader.reader_id = 'R' + insertedId;
            } else {
                reader.reader_id = 'R1001';
            }
            const escapedReader = escapeRegex(reader);

            const result = await readerModel.create(escapedReader);
            return result._id;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, payload) {
        try {
            const reader = this.extractReaderData(payload);
            const escapedReader = escapeRegex(reader);
            const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
            const options = { returnDocument: true };
            const updateDoc = {
                $set: escapedReader,
            };
            return await readerModel.findOneAndUpdate(filter, updateDoc, options);
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const result = await readerModel.deleteOne(filter);
        return result.deletedCount;
    }

    async deleteAll() {
        const result = await readerModel.deleteMany({});
        return result.deletedCount;
    }

    async getById(id) {
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        return await readerModel.findOne(filter);
    }

    async getByAccountId(id) {
        const filter = { account_id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        return await readerModel.findOne(filter);
    }

    async getAll() {
        return await readerModel.find({}).populate('account_id');
    }
}

module.exports = ReaderService;
