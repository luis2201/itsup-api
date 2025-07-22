const express = require('express');
const { body } = require('express-validator');
const ConfiguracionController = require('../controllers/configuracion.controller');

const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyToken, ConfiguracionController.getAllConfiguraciones);

moodule.exports = router;