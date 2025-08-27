const Carrera = require('../models/carrera.model');
const { validationResult } = require('express-validator');

const CarreraController = {

    getAllCarreras: (req, res) => {
        Carrera.getAllCarreras((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener las carreras' });
            }

            res.json(results);
        });
    },

    createCarrera: (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { carrera } = req.body;

        Carrera.findByCarrera({ carrera }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar la carrera' });
            }

            if (result && result.length > 0) {
                return res.status(400).json({ error: 'La carrera ya existe' });
            }

            // Si no existe, crear nueva carrera
            Carrera.createCarrera({ nombre }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear la carrera' });
                }

                return res.status(201).json({ message: 'Carrera creada exitosamente' });
            });
        });
    },

    getCarreraById: (req, res) => {
        const { idcarrera } = req.params;

        Carrera.getCarreraById(idcarrera, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar la carrera' });
            }

            return res.json(result[0]);
        });
    },

    updateCarrera: (req, res) => {
        const { idcarrera } = req.params;
        const { nombre } = req.body;

        Carrera.findByCarrera({ nombre }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar la carrera' });
            }

            if (result && result.length > 0 && result[0].idcarrera !== idcarrera) {
                return res.status(400).json({ error: 'Ya existe una carrera registrada con anterioridad' });
            }

            Carrera.updateCarrera(idcarrera, { nombre }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar la carrera' });
                }

                return res.json({ message: 'Carrera actualizada exitosamente' });
            });
        });
    },

    deleteCarrera: (req, res) => {
        const { idcarrera } = req.params;

        Carrera.deleteCarrera(idcarrera, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar la carrera' });
            }

            return res.json({ message: 'Carrera eliminada exitosamente' });
        });
    },

    activarCarrera: (req, res) => {
        const { idcarrera } = req.params;

        Carrera.activarCarrera(idcarrera, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al activar la carrera' });
            }

            return res.json({ message: 'Carrera activada exitosamente' });
        });
    }

};

module.exports = CarreraController;