const express = require('express');
const { body } = require('express-validator');
const CarreraController = require('../controllers/carrera.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, CarreraController.getAllCarreras);

router.post(
    '/',
    [
        verifyToken,
        verifyRoles(['ADMINCESE']),
        body('nombre').notEmpty().withMessage('El nombre de la carrera es obligatorio'),
    ],
    CarreraController.createCarrera
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), CarreraController.getCarreraById);

router.put('/:id', verifyToken, verifyRoles(['ADMINCESE']), CarreraController.updateCarrera);

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), CarreraController.deleteCarrera);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), CarreraController.activarCarrera);

module.exports = router;    