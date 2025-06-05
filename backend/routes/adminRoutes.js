
const express = require('express');
const { getPendingApprovals, updateApprovalStatus } = require('../controllers/adminController');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

// Apply middleware to all routes
router.use(protect);
router.use(authorize('admin'));

router.get('/pending-approvals', getPendingApprovals);
router.put('/approve-user/:id', updateApprovalStatus);

module.exports = router;