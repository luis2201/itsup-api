const Periodo = require('../models/periodo.model.js');
const { validationResult } = require('express-validator');

const PeriodoController = {

    getAllPeriodos: (req, res) => {
        Periodo.getAllPeriodos((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los periodos' });
            }

            res.json(results);
        });
    },

    createPeriodo: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { periodo, alias, fecha_inicio, fecha_fin } = req.body;

        Periodo.findByIdPeriodo(idperiodo, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el periodo' });
            }

            if(result && result.length > 0) {
                return res.status(400).json({ error: 'El periodo ya existe' });
            }

            //Si no existe, crear nuevo periodo
            res.json(result);
        });
    },

}
