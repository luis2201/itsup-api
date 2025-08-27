const Periodo = require('../models/periodo.model');
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

        const { periodo, alias, fechainicio, fechafin } = req.body;

        Periodo.findByIdPeriodo(idperiodo, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el periodo' });
            }

            if(result && result.length > 0) {
                return res.status(400).json({ error: 'El periodo ya existe' });
            }

            //Si no existe, crear nuevo periodo
            Periodo.createPeriodo({ periodo, alias, fechainicio, fechafin }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear el periodo' });
                }

                return res.status(201).json({ message: 'Periodo creado exitosamente' });
            });

            res.json(result);
        });
    },

    getPeriodoById: (req, res) => {
        const { idperiodo } = req.params;

        Periodo.getPeriodoById(idperiodo, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el periodo' });
            }
            
            return res.json(result[0]);
        });
    },

    updatePeriodo: (req, res) => {
        const { idperiodo } = req.params;
        const { periodo, alias, fechainicio, fechafin } = req.body;

        Periodo.getPeriodoById(idperiodo, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el periodo' });
            }

            if (result && result.length > 0 && result[0].idperiodo !== idperiodo) {
                return res.status(404).json({ error: 'Ya existe un periodo registrado con anterioridad' });
            }

            Periodo.updatePeriodo(idperiodo, { periodo, alias, fechainicio, fechafin }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar el periodo' });
                }

                return res.json({ message: 'Periodo actualizado exitosamente' });
            });
        });
    },

    deletePeriodo: (req, res) => {
        const { idperiodo } = req.params;

        Periodo.deletePeriodo(idperiodo, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el periodo' });
            }

            return res.json({ message: 'Periodo eliminado exitosamente' });
        });
    },

    activarPeriodo: (req, res) => {
        const { idperiodo } = req.params;

        Periodo.activarPeriodo(idperiodo, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al activar el periodo' });
            }

            return res.json({ message: 'Periodo activado exitosamente' });
        });
    }

};

module.exports = PeriodoController;