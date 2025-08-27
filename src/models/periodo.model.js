const db = require('../config/db'); 

const Periodo = {

    getAllPeriodos: (callback) => {
        db.query('SELECT * FROM tb_periodo ORDER BY fecha_inicio', callback)
    },

    createPeriodo: (periodoData, callback) => {
        const { periodo, alias, fecha_inicio, fecha_fin } = periodoData;
        
        db.query('INSERT INTO tb_periodo (periodo, alias, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?)', [periodo, alias, fecha_inicio, fecha_fin], callback);
    },

    getPeriodoById: (idperiodo, callback) => {
        db.query('SELECT * FROM tb_periodo WHERE idperiodo = ?', [idperiodo], callback)
    },

    updatePeriodo: (idperiodo, periodoData, callback) => {
        const { periodo, alias, fecha_inicio, fecha_fin } = periodoData;

        db.query('UPDATE tb_periodo SET periodo = ?, alias = ?, fecha_inicio = ?, fecha_fin = ? WHERE idperiodo = ?', [periodo, alias, fecha_inicio, fecha_fin, idperiodo], callback);
    },

    deletePeriodo: (idperiodo, callback) => {
        db.query('UPDATE tb_periodo SET estado = 0 WHERE idperiodo = ?', [idperiodo], callback);
    },

    activarPeriodo: (idperiodo, callback) => {
        db.query('UPDATE tb_periodo SET estado = 1 WHERE idperiodo = ?', [idperiodo], callback);
    }

}

module.exports = Periodo;