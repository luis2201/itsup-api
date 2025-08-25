const express = require('express');
const { body } = require('express-validator');
const ActaEntregaController = require('../controllers/actaentrega.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, verifyRoles(['ADMINCESE']), ActaEntregaController.getAllActas);

router.post(
    '/',
    verifyToken,
    verifyRoles(['ADMINCESE']),
    [
        body('fecha').notEmpty().withMessage('La fecha del acta es obligatoria'),
        body('hora').notEmpty().withMessage('La hora del acta es obligatoria'),
        body('idequipo').notEmpty().withMessage('El ID del equipo es obligatorio'),
        body('idcliente').notEmpty().withMessage('El ID del cliente es obligatorio'),
        body('idinscripcion').notEmpty().withMessage('El ID de inscripción es obligatorio'),
        body('detalle_reparacion').notEmpty().isString().withMessage('El detalle de reparación debe ser una cadena de texto'),
    ],
    ActaEntregaController.createActa
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), ActaEntregaController.getActaById);

router.put(
    '/:id',
    verifyToken,
    verifyRoles(['ADMINCESE']),
    [
        body('fecha').notEmpty().withMessage('La fecha del acta es obligatoria'),
        body('hora').notEmpty().withMessage('La hora del acta es obligatoria'),
        body('idequipo').notEmpty().withMessage('El ID del equipo es obligatorio'),
        body('idcliente').notEmpty().withMessage('El ID del cliente es obligatorio'),
        body('idinscripcion').notEmpty().withMessage('El ID de inscripción es obligatorio'),
        body('detalle_reparacion').notEmpty().isString().withMessage('El detalle de reparación es obligatorio'),
    ],
    ActaEntregaController.updateActa
);  

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), ActaEntregaController.deleteActa);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), ActaEntregaController.activarActa);

module.exports = router;