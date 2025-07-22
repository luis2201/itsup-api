const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
    // Obtener el token del header Authorization
    const token = req.headers['authorization'];

    // Verificar si el token está presente
    if (!token) {
        console.log('Token no proporcionado');
        return res.status(403).json({ error: 'Token no proporcionado' });
    }

    // Verificar el formato del token
    const tokenParts = token.split(" ");    

    // Si el token no tiene dos partes (header y payload), retornar error
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        console.log('Formato de Token incorrecto');
        return res.status(400).json({ error: 'Formato de Token incorrecto' });
    }

    // Verificar el token usando la clave secreta
    jwt.verify(tokenParts[1], process.env.JWT_SECRET, (err, decoded) => {
        // Si hay un error al verificar el token, retornar error
        if (err) {
            console.error('Token inválido:', err);
            return res.status(401).json({ error: 'Token inválido' });
        }

        // Guardar la información del usuario decodificada en la solicitud
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;