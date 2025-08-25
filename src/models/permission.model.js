const db = require('../config/db');

// Modelo para manejar permisos interactuando con la base de datos
const Permission = {
    getPermissionsByRole: (role, callback) => {
        db.query('SELECT * FROM tb_permisos WHERE Rol = ?', [role], callback);
    }
};

module.exports = Permission;