const express = require('express');
const staff = require('../controllers/staff.controller');

const router = express.Router();

router.post('/', staff.create);

router.get('/:id', staff.getByAccountId);
router.get('/staffs/:id', staff.getById);
router.get('/', staff.getAll);

router.put('/:id', staff.update);

router.delete('/:id', staff.delete);
router.delete('/', staff.deleteAll);

module.exports = router;
