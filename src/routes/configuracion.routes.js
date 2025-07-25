const express = require('express');
const { body } = require('express-validator');
const ConfiguracionController = require('../controllers/configuracion.controller');

// Middleware para verificar token y roles
const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

// Crear el router
const router = express.Router();

// Obtener todas las configuraciones
router.get('/', verifyToken, ConfiguracionController.getAllConfiguraciones);

// Crear una nueva configuración
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

// Obtener configuración por ID
router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), ConfiguracionController.getConfiguracionById);

// Actualizar una configuración
router.put('/:id', verifyToken, verifyRoles(['ADMINCESE']), ConfiguracionController.updateConfiguracion);

// Eliminar una configuración (marcar como inactiva)
router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), ConfiguracionController.deleteConfiguracion);

// Activar una configuración
router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), ConfiguracionController.activarConfiguracion);

module.exports = router;
