const ApiError = require('../api-error');
const httpStatusCodes = require('http-status-codes');
const BorrowingDetailService = require('../services/borrowingDetail.service');
const StaffService = require('../services/staff.service');

const staffService = new StaffService();
const borrowingDetailService = new BorrowingDetailService();
exports.create = async (req, res, next) => {
    try {
        const data = req.body;
        const account_id = data.account_id;
        const staff = await staffService.getByAccountId(account_id);

        // creating borrowing detail for each book
        for (let i = 0; i < data.books.length; i++) {
            const payload = {
                book_id: data.books[i].book_id,
                quantity: data.books[i].quantity,
                reader_id: data.reader_id,
                borrowed_date: data.borrowed_date,
                due_date: data.due_date,
                status: data.status,
                issued_by: staff._id,
            };

            await borrowingDetailService.create(payload);
        }

        return res.status(httpStatusCodes.CREATED).json({
            status: 'success',
        });
    } catch (error) {
        if (error.message.split(':')[2]) {
            const message = error.message.split(':')[2].trim();
            if (message === 'Book ID does not exist.') {
                return next(new ApiError(httpStatusCodes.NOT_FOUND, message));
            }
        }
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.update = async (req, res, next) => {
    try {
        const payload = req.body;
        const borrowing = await borrowingDetailService.update(req.params.id, payload);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: borrowing,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.renew = async (req, res, next) => {
    try {
        const payload = req.body;
        const borrowing = await borrowingDetailService.renew(payload, req.params.account_id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: borrowing,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.reject = async (req, res, next) => {
    try {
        const payload = req.body;
        const borrowing = await borrowingDetailService.reject(payload, req.params.account_id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: borrowing,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const deleted = await borrowingDetailService.delete(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: deleted,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const deletedCount = await borrowingDetailService.deleteAll();
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
        const borrowings = await borrowingDetailService.getAll();
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: borrowings,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getByUserId = async (req, res, next) => {
    try {
        const borrow = await borrowingDetailService.getByUserId(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: borrow,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getBorrowedBookByReader = async (req, res, next) => {
    try {
        const readerId = req.params.id;
        const borrowedBooks = await borrowingDetailService.getBooksByUserId(readerId).book_id;
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: borrowedBooks,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getBorrowedBookByStatus = async (req, res, next) => {
    try {
        const status = req.params.status;
        const id = req.params.id;

        const borrowedBooks = await borrowingDetailService.getByStatus(status, id);

        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: borrowedBooks,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getReturnedBook = async (req, res, next) => {
    try {
        const account_id = req.params.account_id;

        const borrowedBooks = await borrowingDetailService.getReturnedBooks(account_id);

        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: borrowedBooks,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getBorrowedDetails = async (req, res, next) => {
    try {
        const account_id = req.params.id;

        const borrowedDetails = await borrowingDetailService.getBorrowedDetails(account_id);

        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: borrowedDetails,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const borrowedDetails = await borrowingDetailService.findById(id);

        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: borrowedDetails,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
