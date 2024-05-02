const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const { getReports, getReportsById, getReportsByPostId, createReport, deleteReportById, deleteReportByPostId } = require('../controllers/reports');

router.get('/', getReports);
router.get('/get/:id', getReportsById);
router.get('/get/byPost/:id', getReportsByPostId);

router.use(verifyToken);

router.post('/create', createReport);
router.delete('/delete/:id', deleteReportById);
router.delete('/delete/post/:id', deleteReportById);

module.exports = router;