
const User = require('../models/User');

// @desc    Get all pending approvals
// @route   GET /api/admin/pending-approvals
// @access  Private/Admin
exports.getPendingApprovals = async (req, res) => {
  try {
    const pendingUsers = await User.find({
      status: 'pending',
      role: { $in: ['doctor', 'seller'] }
    });

    res.status(200).json({
      success: true,
      count: pendingUsers.length,
      data: pendingUsers
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Approve or reject user
// @route   PUT /api/admin/approve-user/:id
// @access  Private/Admin
exports.updateApprovalStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid status (approved or rejected)'
      });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    if (user.role !== 'doctor' && user.role !== 'seller') {
      return res.status(400).json({
        success: false,
        message: 'Only doctor and seller accounts can be approved or rejected'
      });
    }
    
    user.status = status;
    await user.save();
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};