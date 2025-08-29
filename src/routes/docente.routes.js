const express = require('express');
const { body } = require('express-validator');
const DocenteController = require('../controllers/docente.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, verifyRoles(['ADMINCESE']), DocenteController.getAllDocentes);

router.get('/periodo/:idperiodo/carrera/:idcarrera', verifyToken, DocenteController.getAllDocentesByIdPeriodoCarrera);

router.post(
    '/',
    [
        verifyToken,
        verifyRoles(['ADMINCESE']),
        body('tipodocumento').notEmpty().withMessage('El tipo de documento de identificación es obligatorio'),
        body('numerodocumento').notEmpty().withMessage('El número de documento de identificación es obligatorio'),
        body('apellido1').notEmpty().withMessage('El apellido paterno del docente es obligatorio'),
        body('apellido2').notEmpty().withMessage('El apellido materno del docente es obligatorio'),
        body('nombre1').notEmpty().withMessage('El nombre del docente es obligatorio'),
        body('nombre2'),
    ],
    DocenteController.createDocente
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), DocenteController.getDocenteById);

router.put('/:id', verifyToken, verifyRoles(['ADMINCESE']), DocenteController.updateDocente);

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), DocenteController.deleteDocente);

module.exports = router;
