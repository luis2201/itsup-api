const express = require('express');
const { body }  = require('express-validator');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ruta /api/auth activa');
});

router.post(
    '/login', 
    [
        body('usuario').notEmpty().withMessage('El usuario es obligatorio'),
        body('contrasena').notEmpty().withMessage('La contraseña es obligatoria')
    ], 
    AuthController.login);

module.exports = router;
