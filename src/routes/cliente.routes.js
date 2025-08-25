const express = require('express');
const { body } = require('express-validator');
const ClienteController = require('../controllers/cliente.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, verifyRoles(['ADMINCESE']), ClienteController.getAllClientes);

router.post(
    '/',
    verifyToken,
    verifyRoles(['ADMINCESE']), 
    [
        body('cedula').notEmpty().withMessage('La cédula del cliente es obligatoria'),
        body('nombre').notEmpty().withMessage('El nombre del cliente es obligatorio'),
        body('telefono').notEmpty().withMessage('El teléfono es obligatorio'),
        body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
    ],
    ClienteController.createCliente
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), ClienteController.getClienteById);

router.put(
    '/:id',
    verifyToken,
    verifyRoles(['ADMINCESE']),
    [
        body('cedula').notEmpty().withMessage('La cédula del cliente es obligatoria'),
        body('nombre').notEmpty().withMessage('El nombre del cliente es obligatorio'),
        body('telefono').notEmpty().withMessage('El teléfono es obligatorio'),
        body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
    ],
    ClienteController.updateCliente
);  

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), ClienteController.deleteCliente);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), ClienteController.activarCliente);

module.exports = router;