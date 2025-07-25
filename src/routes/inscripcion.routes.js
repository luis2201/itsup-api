const express = require('express');
const { body } = require('express-validator');  
const InscripcionController = require('../controllers/inscripcion.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, InscripcionController.getAllInscripciones);

router.post(
    '/',
    verifyToken,
    verifyRoles(['ADMINCESE']),
    [
        body('idperiodo').notEmpty().withMessage('El periodo es obligatorio'),
        body('idmatricula').notEmpty().withMessage('La matrícula es obligatoria'),
        body('fecha_inscripcion').notEmpty().withMessage('La fecha de inscripción es obligatoria'),
    ],
    InscripcionController.createInscripcion
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), InscripcionController.getInscripcionById);

router.put('/:id', verifyToken, verifyRoles(['ADMINCESE']), InscripcionController.updateInscripcion);

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), InscripcionController.deleteInscripcion);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), InscripcionController.activarInscripcion);

module.exports = router;