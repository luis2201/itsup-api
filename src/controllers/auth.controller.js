const Auth = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const AuthController = {
    // Iniciar sesión de usuario
    login: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { usuario, contrasena } = req.body;

        Auth.getUserByUsername(usuario, async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el usuario' });
            }

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

            const { idusuario, nombres, tipousuario } = user;

            const token = jwt.sign(
                { idusuario, nombres, tipousuario },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            return res.json({ message: 'Login exitoso', token, idusuario, nombres, tipousuario });
        });
    }

}

module.exports = AuthController;