const db = require('../config/db');

const Inscripcion = {
    // Obtener todas las inscripciones
    getAllInscripciones: (callback) => {
        db.query("SELECT * FROM cese_inscripcion ORDER BY idperiodo", callback);
    },

    // Obtener inscripciones por periodo
    findByIdPeriodo: (idmatricula, callback) => {
        db.query("SELECT * FROM cese_inscripcion WHERE idmatricula = ?", [idmatricula], callback);
    },

    // Buscar inscripción por matrícula
    findByIdMatricula: (idmatricula, callback) => {
        db.query("SELECT * FROM cese_inscripcion WHERE idmatricula = ?", [idmatricula], callback);
    },

    // Crear una nueva inscripción
    createInscripcion: (inscripcionData, callback) => {
        db.query("INSERT INTO cese_inscripcion SET ?", inscripcionData, callback);
    },

    // Obtener inscripción por ID
    getInscripcionById: (idinscripcion, callback) => {
        db.query("SELECT * FROM cese_inscripcion WHERE idinscripcion = ?", [idinscripcion], callback);
    },

    // Actualizar una inscripción
    updateInscripcion: (idinscripcion, inscripcionData, callback) => {
        db.query("UPDATE cese_inscripcion SET ? WHERE idinscripcion = ?", [inscripcionData, idinscripcion], callback);
    },

    // Eliminar una inscripción (marcar como inactiva)
    deleteInscripcion: (idinscripcion, callback) => {
        db.query("UPDATE cese_inscripcion SET estado = 0 WHERE idinscripcion = ?", [idinscripcion], callback);
    },

    // Activar una inscripción
    activarInscripcion: (idinscripcion, callback) => {
        db.query("UPDATE cese_inscripcion SET estado = 1 WHERE idinscripcion = ?", [idinscripcion], callback);
    },    

};