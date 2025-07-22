const verifyRole = (rolesPermitidos) => {
    // Middleware para verificar el rol del usuario    
    return (req, res, next) => {        
        // Verificar si el usuario está autenticado
        if(!rolesPermitidos.includes(req.user.tipousuario)) {
            return res.status(403).json({ message: 'Acceso denegado: Rol no autorizado' });
        }
        // Si el rol es permitido, continuar con la siguiente función middleware
        next();
    };

}

module.exports = verifyRole;