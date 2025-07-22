const express = require('express');
const { body } = require('express-validator');
const ConfiguracionController = require('../controllers/configuracion.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, ConfiguracionController.getAllConfiguraciones);

router.post(
    '/',
    verifyToken,
    verifyRoles(['ADMINCESE']),
    [
        body('idperiodo').notEmpty().withMessage('El periodo es obligatorio'),
        body('idcarrera').notEmpty().withMessage('La carrera es obligatoria'),
        body('iddocente').notEmpty().withMessage('El docente es obligatorio'),
        body('horas_requeridas').notEmpty().withMessage('Las horas son obligatorias')
    ],
    ConfiguracionController.createConfiguracion
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), ConfiguracionController.getConfiguracionById);

router.put('/:id', verifyToken, verifyRoles(['ADMINCESE']), ConfiguracionController.updateConfiguracion);

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), ConfiguracionController.deleteConfiguracion);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), ConfiguracionController.activarConfiguracion);

module.exports = router;
