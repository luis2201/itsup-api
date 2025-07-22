const Permissions = require('../models/permissions.model');

// Middleware para verificar permisos basados en el rol del usuario
const verifyPermissions = (req, res, next) => { 
    
    // Verificar si el usuario está autenticado
    const { tipousuario } = req.user;
    // Verificar si el rol del usuario está definido
    Permissions.getpermissionsByRole(tipousuario, (err, results) => {
        // Manejar errores de la consulta
        if (err) {
            return res.status(500).json({ message: 'Error al obtener permisos' });
        }
        // Verificar si el rol tiene permisos asignados
        if (results.length === 0) {
            return res.status(403).json({ message: 'Acceso denegado: Rol no tiene permisos' });
        }

        // Asignar los permisos al objeto de solicitud para su uso posterior
        req.menus = results.map(row => row.Menu);
        next();
    });

}

module.exports = verifyPermissions;