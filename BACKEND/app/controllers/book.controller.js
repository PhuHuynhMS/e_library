const ApiError = require('../api-error');
const httpStatusCodes = require('http-status-codes');
const BookService = require('../services/book.service');

const bookService = new BookService();

exports.create = async (req, res, next) => {
    try {
        const data = req.body;
        const payload = {
            book_name: data.book_name,
            book_price: data.book_price,
            book_quantity: data.book_quantity,
            published_year: data.published_year,
            publisher: data.publisher,
            author: data.author,
        };

        if (req.file) {
            payload.image_url = `/uploads/${req.file.filename}`;
        }
        const book = await bookService.create(payload);
        return res.status(httpStatusCodes.CREATED).json({
            status: 'success',
            data: book,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

exports.update = async (req, res, next) => {
    try {
        const data = req.body;
        const payload = {
            book_name: data.book_name,
            book_price: data.book_price,
            book_quantity: data.book_quantity,
            published_year: data.published_year,
            author: data.author,
        };

        const book = await bookService.update(req.params.id, payload);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: book,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

//Delete book
exports.delete = async (req, res, next) => {
    try {
        const book = await bookService.delete(req.params.id);
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: book,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

//Delete all books
exports.deleteAll = async (req, res, next) => {
    try {
        const deletedCount = await bookService.deleteAll();
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: deletedCount,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.mnessage));
    }
};

//Get all books
exports.getAll = async (req, res, next) => {
    try {
        const books = await bookService.getAll();
        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: books,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

//Get book by id
exports.getById = async (req, res, next) => {
    try {
        const book = await bookService.findById(req.params.id);

        return res.status(httpStatusCodes.OK).json({
            status: 'success',
            data: book,
        });
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

//Search book by name, author or year
exports.search = async (req, res, next) => {
    try {
        const { name, author, year } = req.query;

        if (!name && !author && !year) {
            return next(new ApiError(httpStatusCodes.BAD_REQUEST, 'Please provide at least one search parameter!'));
        }

        const payload = {
            book_name: name,
            author: author,
            published_year: year,
        };

        const book = await bookService.find(payload);
        if (book) {
            return res.status(httpStatusCodes.OK).json({
                status: 'success',
                data: book,
            });
        } else {
            return next(new ApiError(httpStatusCodes.NOT_FOUND, 'Book not found!'));
        }
    } catch (error) {
        return next(new ApiError(httpStatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
