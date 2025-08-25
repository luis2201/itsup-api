const Permissions = require('../models/permission.model');

const PermissionController = {
    getMenusByRole: (req, res) => {
        const { Rol } = req.user; // Extraemos el rol desde el token JWT        

        Permission.getPermissionsByRole(Rol, (err, menuTree) => {
            if (err) {
                console.error("Error obteniendo permisos:", err);
                return res.status(500).json({ error: 'Error al obtener permisos' });
            }

            res.json({ Rol, menus: menuTree });
        });
    }
};

module.exports = PermissionController;