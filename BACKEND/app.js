const express = require('express');
const cors = require('cors');
const ApiError = require('./app/api-error');
const path = require('path');

// Routers
const bookRouter = require('./app/routes/book.route');
const readerRouter = require('./app/routes/reader.route');
const publisherRouter = require('./app/routes/publisher.route');
const staffRouter = require('./app/routes/staff.route');
const borrowingDetailRouter = require('./app/routes/borrowingDetail.route');
const accountRouter = require('./app/routes/account.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to e_library ' });
});

// Routes
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/readers', readerRouter);
app.use('/api/v1/publishers', publisherRouter);
app.use('/api/v1/staffs', staffRouter);
app.use('/api/v1/borrowingDetails', borrowingDetailRouter);
app.use('/api/v1/accounts', accountRouter);

// Handle not found

app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

module.exports = app;
