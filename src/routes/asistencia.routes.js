const express = require('express');
const { body } = require('express-validator');
const AsistenciaController = require('../controllers/asistencia.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, verifyRoles(['ADMINCESE']), AsistenciaController.getAllAsistencias);

router.post(
    '/',
    verifyToken,
    verifyRoles(['ADMINCESE']),
    [
        body('idinscripcion').notEmpty().withMessage('El estudiante es obligatoria'),
        body('fecha').notEmpty().withMessage('La fecha de asistencia es obligatoria'),
        body('hora_entrada').notEmpty().withMessage('La hora de entrada es obligatoria'),
        body('hora_salida').notEmpty().withMessage('La hora de salida es obligatoria'),
    ],
    AsistenciaController.createAsistencia
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), AsistenciaController.getAsistenciaById);

router.put('/:id', verifyToken, verifyRoles(['ADMINCESE']), AsistenciaController.updateAsistencia); 

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), AsistenciaController.deleteAsistencia);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), AsistenciaController.activarAsistencia);

module.exports = router;