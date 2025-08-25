const express = require('express');
const { body } = require('express-validator');
const PermissionController = require('../controllers/permission.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/menus', verifyToken, verifyRoles(['ADMINCESE']), PermissionController.getMenusByRole);

module.exports = router;