const ApiError = require('../api-error');
const httpStatusCodes = require('http-status-codes');
const StaffService = require('../services/staff.service');

const staffService = new StaffService();
exports.create = async (req, res, next) => {
    try {
        const data = req.body;
        const payload = {
            staff_name: data.staff_name,
            staff_address: data.staff_address,
            staff_phone: data.staff_phone,
            staff_role: data.staff_role,
            account_id: data.account_id,
        };
        const staff = await staffService.create(payload);
        return res.status(httpStatusCodes.CREATED).json({
            status: 'success',
            data: staff,
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
        const staff = await staffService.update(req.params.id, payload);

        if (staff instanceof Error) {
            return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, staff.message));
        }

        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: staff,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deletedStaff = await staffService.delete(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: deletedStaff,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const deletedCount = await staffService.deleteAll();
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
        const staffs = await staffService.getAll();
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: staffs,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getByAccountId = async (req, res, next) => {
    try {
        const staff = await staffService.getByAccountId(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: staff,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getById = async (req, res, next) => {
    try {
        const staff = await staffService.getById(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: staff,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
