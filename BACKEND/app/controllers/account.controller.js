const httpStatusCodes = require('http-status-codes');
const dotenv = require('dotenv');
const ApiError = require('../api-error');
const AccountService = require('../services/account.service');
const ReaderService = require('../services/reader.service');
const StaffService = require('../services/staff.service');
const jwt = require('jsonwebtoken');

dotenv.config();

const accountService = new AccountService();

exports.createReaderAccount = async (req, res, next) => {
    try {
        const data = req.body;

        const account = await accountService.createReaderAccount(data);

        const tokenPayload = {
            account_id: account._id,
            account_role: account.account_role,
        };
        const token = jwt.sign(
            {
                tokenPayload,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1d',
            },
        );

        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: {
                token,
            },
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.createStaffAccount = async (req, res, next) => {
    try {
        const data = req.body;

        const account = await accountService.createStaffAccount(data);
        console.log(data);

        return res.status(httpStatusCodes.CREATED).json({
            status: 'success',
            data: account,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.login = async (req, res, next) => {
    try {
        const data = req.body;

        const validAccount = await accountService.authenticate(data);

        if (validAccount) {
            const tokenPayload = {
                account_id: validAccount._id,
                account_role: validAccount.account_role,
            };
            const token = jwt.sign(
                {
                    tokenPayload,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1d',
                },
            );

            return res.status(httpStatusCodes.OK).json({
                status: 'success',
                data: {
                    token,
                },
            });
        }
        return next(new ApiError(httpStatusCodes.UNAUTHORIZED, 'Invalid username or password'));
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.changePassword = async (req, res, next) => {
    try {
        const payload = req.body;
        console.log('acount id: ', req.params.id);

        const account = await accountService.changePassword(req.params.id, payload);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: account,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.update = async (req, res, next) => {
    try {
        const payload = req.body;
        const account = await accountService.update(req.params.id, payload);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: account,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const account = await accountService.delete(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: account,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const deletedCount = await accountService.deleteAll();
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
        const accounts = await accountService.getAll();
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: accounts,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getById = async (req, res, next) => {
    try {
        const account = await accountService.getById(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: account,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
