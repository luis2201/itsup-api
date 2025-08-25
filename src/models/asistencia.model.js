const db = require('../config/db');

const Asistencia = {
    // Obtener todas las asistencias
    getAllAsistencias: (callback) => {
        db.query("SELECT * FROM cese_asistencia ORDER BY fecha", callback);
    },

    // Buscar asistencia por fecha y estudiante
    findByFecha: (params, callback) => {
        const { idinscripcion, fecha } = params;
        db.query("SELECT * FROM cese_asistencia WHERE idinscripcion = ? AND fecha = ?", [idinscripcion, fecha], callback);
    },

    // Crear una nueva asistencia
    createAsistencia: (asistenciaData, callback) => {
        const { idinscripcion, fecha, hora_entrada, hora_salida } = asistenciaData;
        
        db.query("INSERT INTO cese_asistencia (idinscripcion, fecha, hora_entrada, hora_salida) VALUES (?, ?, ?, ?)", [idinscripcion, fecha, hora_entrada, hora_salida], callback);
    },

    // Obtener asistencia por ID
    getAsistenciaById: (idasistencia, callback) => {
        db.query("SELECT * FROM cese_asistencia WHERE idasistencia = ?", [idasistencia], callback);
    },

    // Actualizar una asistencia
    updateAsistencia: (idasistencia, asistenciaData, callback) => {
        const { idinscripcion, fecha, hora_entrada, hora_salida } = asistenciaData;

        db.query("UPDATE cese_asistencia SET idinscripcion = ?, fecha = ?, hora_entrada = ?, hora_salida = ? WHERE idasistencia = ?", [idinscripcion, fecha, hora_entrada, hora_salida, idasistencia], callback);
    },

    // Eliminar una asistencia (marcar como inactiva)
    deleteAsistencia: (idasistencia, callback) => {
        db.query("DELETE FROM cese_asistencia WHERE idasistencia = ?", [idasistencia], callback);
    },

    // Activar una asistencia
    activarAsistencia: (idasistencia, callback) => {
        db.query("UPDATE cese_asistencia SET estado = 'activo' WHERE idasistencia = ?", [idasistencia], callback);
    },

};

module.exports = Asistencia;