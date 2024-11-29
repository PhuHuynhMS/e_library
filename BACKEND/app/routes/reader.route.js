const express = require('express');
const reader = require('../controllers/reader.controller');

const router = express.Router();

router.post('/', reader.create);

router.get('/:id', reader.getByAccountId);
router.get('/readers/:id', reader.getById);
router.get('/', reader.getAll);

router.put('/:id', reader.update);

router.delete('/:id', reader.delete);
router.delete('/', reader.deleteAll);

module.exports = router;
