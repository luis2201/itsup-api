const express = require('express');
const { body } = require('express-validator');
const UsuariosCeseController = require('../controllers/usuariocese.controller');

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
    UsuariosCeseController.createUsuarioCese
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.getUsuarioCeseById);

router.put('/:id', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.updateUsuarioCese);

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.deleteUsuarioCese);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.activarUsuarioCese);

module.exports = router;