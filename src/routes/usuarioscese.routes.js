const express = require('express');
const { body } = require('express-validator');
const UsuariosCeseController = require('../controllers/usuarioscese.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, UsuariosCeseController.getAllUsuariosCese);

router.post(
    '/',
    verifyToken,
    verifyRoles(['ADMINCESE']),
    body('nombres').notEmpty().withMessage('El nombre del usuario es obligatorio'),
    body('tipousuario').notEmpty().withMessage('El tipo del usuario es obligatorio'),
    body('usuario').notEmpty().withMessage('El usuario es obligatorio'),
    body('contrasena').notEmpty().withMessage('La contraseña es obligatoria'),
    UsuariosCeseController.createUsuariosCese
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.getUsuariosCeseById);

router.put('/:id', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.updateUsuariosCese);

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.deleteUsuariosCese);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.activarUsuariosCese);

module.exports = router;