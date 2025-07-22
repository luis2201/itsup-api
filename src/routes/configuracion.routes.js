const express = require('express');
const { body } = require('express-validator');
const ConfiguracionController = require('../controllers/configuracion.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, ConfiguracionController.getAllConfiguraciones);

module.exports = router;
