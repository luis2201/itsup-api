const db = require('../config/db');
const bcrypt = require('bcrypt');

const Auth = {
    // Obtener usuario por nombre de usuario
    getUserByUsername: (Usuario, callback) => {
        // Consulta a la base de datos para obtener el usuario
        db.query('SELECT * FROM tb_usuario WHERE usuario = ? AND Estado = 1', [Usuario], callback);
    },

    // Verifica la contraseña del usuario
    verifyPassword: async (plainPassword, hashedPassword) => {
        // Verificar si la contraseña proporcionada coincide con la contraseña almacenada
        return await bcrypt.compare(plainPassword, hashedPassword);
    },

    // Actualiza la contraseña del usuario
    updatePassword: (idusuario, hashedPassword, callback) => {
        // Actualizar la contraseña del usuario en la base de datos
        db.query('UPDATE tb_usuario SET contrasena = ? WHERE idusuario = ?', [hashedPassword, idusuario], callback);
    }
}

module.exports = Auth;