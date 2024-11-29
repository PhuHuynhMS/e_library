const express = require('express');
const borrowingDetail = require('../controllers/borrowingDetail.controller');

const router = express.Router();

router.post('/', borrowingDetail.create);

router.get('/:id/status/:status', borrowingDetail.getBorrowedBookByStatus);
router.get('/:id/borrowed-details', borrowingDetail.getBorrowedDetails);
router.get('/borrowing-details/:id', borrowingDetail.getById);
router.get('/:id', borrowingDetail.getByUserId);
router.get('/returned-books/:account_id', borrowingDetail.getReturnedBook);
router.get('/', borrowingDetail.getAll);

router.put('/:id', borrowingDetail.update);
router.put('/renew/:account_id/', borrowingDetail.renew);
router.put('/reject/:account_id/', borrowingDetail.reject);

router.delete('/:id', borrowingDetail.delete);
router.delete('/', borrowingDetail.deleteAll);

module.exports = router;
