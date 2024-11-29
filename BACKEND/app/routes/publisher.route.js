const express = require('express');
const publisher = require('../controllers/publisher.controller');

const router = express.Router();

router.post('/', publisher.create);

router.get('/:id', publisher.getById);
router.get('/', publisher.getAll);

router.put('/:id', publisher.update);

router.delete('/:id', publisher.delete);
router.delete('/', publisher.deleteAll);

module.exports = router;
