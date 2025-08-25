const db = require('../config/db');

// Modelo para manejar permisos interactuando con la base de datos
const Permissions = {
    getpermissionsByRole: (role, callback) => {
        db.query = ('SELECT * FROM tb_permisos WHERE Rol = ?', [Rol], callback);
    }
};

module.exports = Permissions;