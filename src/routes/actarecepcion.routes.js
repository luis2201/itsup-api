const express = require('express');
const { body } = require('express-validator');
const ActaRecepcionController = require('../controllers/actarecepcion.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, verifyRoles(['ADMINCESE']), ActaRecepcionController.getAllActas);

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
        body('diagnostico').notEmpty().isString().withMessage('El diagnóstico del equipo debe ser una cadena de texto'),
    ],
    ActaRecepcionController.createActa
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), ActaRecepcionController.getActaById);

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
        body('diagnostico').notEmpty().isString().withMessage('El diagnóstico del equipo es obligatorio'),
    ],
    ActaRecepcionController.updateActa
);


router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), ActaRecepcionController.deleteActa);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), ActaRecepcionController.activarActa);

module.exports = router;