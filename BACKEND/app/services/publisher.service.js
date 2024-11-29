const publisherModel = require('../models/publisher.model');
const { ObjectId } = require('mongodb');
const { escapeRegex } = require('../utils/helper');

class PublisherService {
    extractPublisherData(payload) {
        const publisher = {
            publisher_name: payload.publisher_name,
            publisher_address: payload.publisher_address,
        };
        Object.keys(publisher).forEach((key) => publisher[key] == undefined && delete publisher[key]);
        return publisher;
    }

    async create(payload) {
        const publisher = this.extractPublisherData(payload);
        const escapedPublisher = escapeRegex(publisher);
        const result = await publisherModel.create(escapedPublisher);
        return result._id;
    }

    async update(id, payload) {
        const publisher = this.extractPublisherData(payload);
        const escapedPublisher = escapeRegex(publisher);
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const options = { returnDocument: true };
        const updateDoc = {
            $set: escapedPublisher,
        };
        return await publisherModel.findOneAndUpdate(filter, updateDoc, options);
    }

    async delete(id) {
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        const result = await publisherModel.deleteOne(filter);
        return result.deletedCount;
    }

    async deleteAll() {
        const result = await publisherModel.deleteMany({});
        return result.deletedCount;
    }

    async getById(id) {
        const filter = { _id: ObjectId.isValid(id) ? new ObjectId(id) : null };
        return await publisherModel.findOne(filter);
    }

    async getAll() {
        return await publisherModel.find({});
    }

    async getByName(name) {
        const escapedName = escapeRegex(name);
        const filter = { publisher_name: { $regex: new RegExp(escapedName), $options: 'i' } };
        return await publisherModel.findOne(filter);
    }
}

module.exports = PublisherService;
