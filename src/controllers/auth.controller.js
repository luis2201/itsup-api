const Auth = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const AuthController = {
    // Iniciar sesión de usuario
    login: (req, res) => {
        // Validar los datos de entrada
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Obtener usuario y contraseña del cuerpo de la solicitud
        const { usuario, contrasena } = req.body;

        // Verificar si el usuario existe
        Auth.getUserByUsername(usuario, async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el usuario' });
            }
            
            // Verificar si se encontró el usuario
            if (results.length === 0) {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
            
            // Obtener el primer usuario de los resultados
            const user = results[0];

            // Verificar si el usuario está activo
            const isMatch = await Auth.verifyPassword(contrasena, user.contrasena);            
            if(!isMatch) {
                return res.status(401).json({ error: 'Credenciales incorrectas' });
            }
        
            // Asignar los datos del usuario
            const { idusuario, nombres, tipousuario } = user;

            // Generar token JWT
            const token = jwt.sign(
                { idusuario: user.idusuario, nombres: user.nombres, tipousuario: user.tipousuario },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            // Enviar respuesta con el token y los datos del usuario
            return res.json({ message: 'Login exitoso', token, idusuario, nombres, tipousuario });
        });
    }

}

module.exports = AuthController;