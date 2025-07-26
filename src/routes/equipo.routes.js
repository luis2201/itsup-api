const express = require('express');
const { body } = require('express-validator');
const EquipoController = require('../controllers/equipo.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, verifyRoles(['ADMINCESE']), EquipoController.getAllEquipos);

router.post(
    '/',
    verifyToken,
    verifyRoles(['ADMINCESE']),
    [
        body('marca').notEmpty().withMessage('La marca del equipo es obligatoria'),
        body('modelo').notEmpty().withMessage('El modelo del equipo es obligatorio'),
        body('numero_serie').notEmpty().withMessage('El número de serie del equipo es obligatorio'),
        body('descripcion').notEmpty().isString().withMessage('La descripción del equipo debe ser una cadena de texto')
    ],
    EquipoController.createEquipo
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), EquipoController.getEquipoById);

router.put(
    '/:id',
    verifyToken,
    verifyRoles(['ADMINCESE']),
    [
        body('marca').notEmpty().withMessage('La marca del equipo es obligatoria'),
        body('modelo').notEmpty().withMessage('El modelo del equipo es obligatorio'),
        body('numero_serie').notEmpty().withMessage('El número de serie del equipo es obligatorio'),
        body('descripcion').notEmpty().isString().withMessage('La descripción del equipo debe ser una cadena de texto')
    ],
    EquipoController.updateEquipo
); 

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), EquipoController.deleteEquipo);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), EquipoController.activarEquipo);

module.exports = router;
