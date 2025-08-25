const db = require('../config/db');

// Modelo para manejar permisos interactuando con la base de datos
const Permissions = {
    getPermissionsByRole: (role, callback) => {
        console.log(`Obteniendo permisos para el rol: ${role}`);
        db.query('SELECT * FROM tb_permisos WHERE Rol = ?', [role], callback);
    }
};

module.exports = Permissions;