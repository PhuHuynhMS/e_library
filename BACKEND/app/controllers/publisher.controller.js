const PublisherService = require('../services/publisher.service');
const ApiError = require('../api-error');
const httpStatusCodes = require('http-status-codes');

const publisherService = new PublisherService();
exports.create = async (req, res, next) => {
    try {
        const data = req.body;
        const payload = {
            publisher_name: data.publisher_name,
            publisher_address: data.publisher_address,
        };
        const publisher = await publisherService.create(payload);
        return res.status(httpStatusCodes.CREATED).json({
            status: 'success',
            data: publisher,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.update = async (req, res, next) => {
    try {
        const payload = req.body;
        const publisher = await publisherService.update(req.params.id, payload);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: publisher,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deletedPublisher = await publisherService.delete(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: deletedPublisher,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const deletedCount = await publisherService.deleteAll();
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: deletedCount,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.mnessage));
    }
};

exports.getAll = async (req, res, next) => {
    try {
        const publishers = await publisherService.getAll();
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: publishers,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getById = async (req, res, next) => {
    try {
        const publisher = await publisherService.getById(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: publisher,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
