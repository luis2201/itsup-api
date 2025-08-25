const db = require('../config/db');

const Configuracion = {
    // Obtener todas las configuraciones
    getAllConfiguraciones: (callback) => {
        db.query("SELECT * FROM cese_configuracion ORDER BY idperiodo", callback);
    },

    // Obtener configuraciones por periodo
    findByPeriodo: (idperiodo, callback) => {
        db.query("SELECT * FROM cese_configuracion WHERE idperiodo = ?", [idperiodo], callback);
    },

    // Crear una nueva configuración
    createConfiguracion: (configuracionData, callback) => {
        const { idperiodo, idcarrera, iddocente, horas_requeridas } = configuracionData;

        db.query("INSERT INTO cese_configuracion (idperiodo, idcarrera, iddocente, horas_requeridas) VALUES (?, ?, ?, ?)", [idperiodo, idcarrera, iddocente, horas_requeridas], callback);
    },

    // Métodos CRUD
    getConfiguracionById: (idconfiguracion, callback) => {
        db.query("SELECT * FROM cese_configuracion WHERE idconfiguracion = ?", [idconfiguracion], callback);
    },

    // Actualizar una configuración
    updateConfiguracion: (idconfiguracion, configuracionData, callback) => {
        const { idperiodo, idcarrera, iddocente, horas_requeridas } = configuracionData;

        db.query("UPDATE cese_configuracion SET idperiodo = ?, idcarrera = ?, iddocente = ?, horas_requeridas = ? WHERE idconfiguracion = ?", [idperiodo, idcarrera, iddocente, horas_requeridas, idconfiguracion], callback);
    },

    // Eliminar una configuración (marcar como inactiva)
    deleteConfiguracion: (idconfiguracion, callback) => {
        db.query("UPDATE cese_configuracion SET estado = 0 WHERE idconfiguracion = ?", [idconfiguracion], callback);
    },

    // Activar una configuración
    activarConfiguracion: (idconfiguracion, callback) => {
        db.query("UPDATE cese_configuracion SET estado = 1 WHERE idconfiguracion = ?", [idconfiguracion], callback);
    }

};

module.exports = Configuracion;
