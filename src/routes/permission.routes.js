const express = require('express');
const { body } = require('express-validator');
const PermissionController = require('../controllers/permission.controller');

const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/menus', verifyToken, PermissionController.getMenusByRole);

module.exports = router;