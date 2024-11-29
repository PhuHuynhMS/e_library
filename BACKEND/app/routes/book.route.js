const express = require('express');
const book = require('../controllers/book.controller');
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/', upload.single('image'), book.create);

router.get('/search', book.search);
router.get('/:id', book.getById);
router.get('/', book.getAll);

router.put('/:id', book.update);

router.delete('/:id', book.delete);
router.delete('/', book.deleteAll);

module.exports = router;
