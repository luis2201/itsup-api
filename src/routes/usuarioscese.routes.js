const express = require('express');
const { body } = require('express-validator');
const UsuariosCeseController = require('../controllers/usuariocese.controller');

const verifyToken = require('../middleware/authMiddleware');
const verifyRoles = require('../middleware/roleMiddleware');

const router = express.Router();

router.get('/', verifyToken, UsuariosCeseController.getAllUsuariosCese);

const { body } = require('express-validator');

router.post(
  '/',
  verifyToken,
  verifyRoles(['ADMINCESE']),
  body('nombres').notEmpty().withMessage('El nombre del usuario es obligatorio'),
  body('tipousuario').notEmpty().withMessage('El tipo del usuario es obligatorio'),  
  body('correo')
    .notEmpty().withMessage('El correo es obligatorio')
    .isEmail().withMessage('El correo no tiene un formato válido'),
  body('telefono')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .matches(/^\d{7,15}$/).withMessage('El teléfono debe contener solo números y tener entre 7 y 15 dígitos'),
  body('usuario').notEmpty().withMessage('El usuario es obligatorio'),
  body('contrasena').notEmpty().withMessage('La contraseña es obligatoria'),  
  UsuariosCeseController.createUsuarioCese
);

router.get('/:id', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.getUsuarioCeseById);

router.put('/:id', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.updateUsuarioCese);

router.delete('/:id', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.deleteUsuarioCese);

router.put('/:id/activar', verifyToken, verifyRoles(['ADMINCESE']), UsuariosCeseController.activarUsuarioCese);

module.exports = router;