const express = require('express');
const account = require('../controllers/account.controller');

const router = express.Router();
router.get('/', account.getAll);

router.post('/reader', account.createReaderAccount);
router.post('/staff', account.createStaffAccount);

router.post('/auth', account.login);

router.put('/change-password/:id', account.changePassword);

router.delete('/:id', account.delete);

module.exports = router;
