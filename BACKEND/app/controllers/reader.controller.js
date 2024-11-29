const ApiError = require('../api-error');
const httpStatusCodes = require('http-status-codes');
const ReaderService = require('../services/reader.service');

const readerService = new ReaderService();
exports.create = async (req, res, next) => {
    try {
        const data = req.body;
        const payload = {
            reader_firstname: data.reader_firstname,
            reader_lastname: data.reader_lastname,
            reader_birthday: data.reader_birthday,
            reader_gender: data.reader_gender,
            reader_address: data.reader_address,
            reader_phone: data.reader_phone,
            account_id: data.account_id,
        };
        const reader = await readerService.create(payload);
        return res.status(httpStatusCodes.CREATED).json({
            status: 'success',
            data: reader,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(httpStatusCodes.BAD_REQUEST, 'Data to update can not be empty!'));
    }
    try {
        const payload = req.body;
        const reader = await readerService.update(req.params.id, payload);

        if (reader instanceof Error) {
            return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, reader.message));
        }

        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: reader,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deletedReader = await readerService.delete(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: deletedReader,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const deletedCount = await readerService.deleteAll();
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
        const readers = await readerService.getAll();
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: readers,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getById = async (req, res, next) => {
    try {
        const reader = await readerService.getById(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: reader,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getByAccountId = async (req, res, next) => {
    try {
        console.log('abc');

        const account_id = req.params.id;

        const reader = await readerService.getByAccountId(account_id);

        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: reader,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
