const Configuracion = require('../models/configuracion.model');
const { validationResult } = require('express-validator');

const ConfiguracionController = {

    getAllConfiguraciones: (req, res) => {
        Configuracion.getAll((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener configuraciones' });
            }
            return res.json(results);
        });
    }
    
};

module.exports = ConfiguracionController;
