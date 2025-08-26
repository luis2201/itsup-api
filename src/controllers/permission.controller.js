const Permissions = require('../models/permission.model');

const PermissionController = {

    getMenusByRole: (req, res) => {
        const { tipousuario } = req.user; // Extraemos el rol desde el token JWT        

        Permissions.getPermissionsByRole(tipousuario, (err, menuTree) => {
            if (err) {
                console.error("Error obteniendo permisos:", err);
                return res.status(500).json({ error: 'Error al obtener permisos' });
            }

            res.json({ tipousuario, menus: menuTree });
        });
    }

};

module.exports = PermissionController;