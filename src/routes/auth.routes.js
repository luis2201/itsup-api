const express = require('express');
const { body }  = require('express-validator');
const AuthController = require('../controllers/auth.controller');
console.log(body);
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Ruta /api/auth activa');
});

router.post(
    '/login', 
    [
        body('usuario').isString().trim().notEmpty().withMessage('El usuario es obligatorio'),
        body('contrasena').isString().trim().notEmpty().withMessage('La contraseña es obligatoria')
    ], 
    AuthController.login
);

module.exports = router;
