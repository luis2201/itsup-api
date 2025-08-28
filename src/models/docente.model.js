const db = require('../config/db'); 

const Docente = {

    getAllDocentes: (callback) => {
        db.query('SELECT * FROM tb_docente ORDER BY apellido1, apellido2, nombre1, nombre2', callback);
    },

    getAllDocentesByIdPeriodoCarrera: (idperiodo, idcarrera, callback) => {
        db.query(`SELECT DISTINCT 
                    D.iddocente,
                    CONCAT(D.apellido1, ' ', D.apellido2, ' ', D.nombre1, ' ', D.nombre2) AS docente,
                    CH.idperiodo,
                    DCH.idcarrera
                FROM tb_docente D
                INNER JOIN tb_carga_horaria CH
                    ON D.iddocente = CH.iddocente
                INNER JOIN tb_detalle_cargahoraria DCH
                    ON CH.idcarga_horaria = DCH.idcarga_horaria
                WHERE CH.idperiodo = ?
                AND DCH.idcarrera = ?
                ORDER BY docente;`, [idperiodo, idcarrera], callback);
    },

    findByDocumento: (numerodocumento, callback) => {
        db.query(`SELECT * FROM tb_docente WHERE numerodocumento = ?`, [numerodocumento], callback);
    },

    createDocente: (docenteData, callback) => {
        const { numerodocumento, apellido1, apellido2, nombre1, nombre2 } = docenteData;
        db.query(`INSERT INTO tb_docente (numerodocumento, apellido1, apellido2, nombre1, nombre2) VALUES (?, ?, ?, ?, ?)`,
            [numerodocumento, apellido1, apellido2, nombre1, nombre2], callback);
    },

    getDocenteById: (iddocente, callback) => {
        db.query(`SELECT * FROM tb_docente WHERE iddocente = ?`, [iddocente], callback);
    },

    updateDocente: (iddocente, docenteData, callback) => {
        const { numerodocumento, apellido1, apellido2, nombre1, nombre2 } = docenteData;
        db.query(`UPDATE tb_docente SET numerodocumento = ?, apellido1 = ?, apellido2 = ?, nombre1 = ?, nombre2 = ? WHERE iddocente = ?`,
            [numerodocumento, apellido1, apellido2, nombre1, nombre2, iddocente], callback);
    },

    deleteDocente: (iddocente, callback) => {
        db.query(`UPDATE tb_docente SET estado = 0 WHERE iddocente = ?`, [iddocente], callback);
    },
    
    activarDocente: (iddocente, callback) => {
        db.query(`UPDATE tb_docente SET estado = 1 WHERE iddocente = ?`, [iddocente], callback);
    }    

}
module.exports = Docente;