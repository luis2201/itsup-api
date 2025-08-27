const db = require('../config/db');
const { createCarrera } = require('../controllers/carrera.controller');

const Carrera = {

    getAllCarreras: (callback) => {
        db.query('SELECT * FROM tb_carrera ORDER BY carrera', callback);
    },

    findByCarrera: (carreraData, callback) => {
        db.query('SELECT * FROM tb_carrera WHERE carrera = ?', [carreraData], callback);
    },

    createCarrera: (carreraData, callback) => {
        const { carrera } = carreraData;

        db.query('INSERT INTO tb_carrera (carrera) VALUES (?)', [carrera], callback);
    }

};

module.exports = Carrera;