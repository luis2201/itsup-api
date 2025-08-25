const Equipo = require('../models/equipo.model');
const { validationResult } = require('express-validator');

const EquipoController = {

    getAllEquipos: (req, res) => {
        Equipo.getAllEquipos((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener equipos' });
            }
            return res.json(results);
        });
    },

    createEquipo: (req, res) => {   
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { marca, modelo, numero_serie, descripcion } = req.body;

        Equipo.findByNumeroSerie(numero_serie, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar equipo existente' });
            }

            if (result && result.length > 0) {
                return res.status(400).json({ message: 'Ya existe un equipo con este número de serie.' });
            }

            // Si no existe, crear nuevo equipo
            Equipo.createEquipo({ marca, modelo, numero_serie, descripcion }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear el equipo' });
                }
                return res.status(201).json({ message: 'Equipo creado exitosamente' });
            });
        });        
    },

    getEquipoById: (req, res) => {
        const { id } = req.params;

        Equipo.getEquipoById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener equipo' });
            }
            return res.json(result[0]);
        });
    },

    updateEquipo: (req, res) => {
        const { id } = req.params;
        const { marca, modelo, numero_serie, descripcion } = req.body;

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        Equipo.findByNumeroSerie(numero_serie, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar equipo existente' });
            }

            if (result && result.length > 0 && result[0].idequipo !== parseInt(id)) {
                return res.status(400).json({ message: 'Ya existe un equipo con este número de serie.' });
            }

            // Si no existe o es el mismo, actualizar equipo
            Equipo.updateEquipo(id, { marca, modelo, numero_serie, descripcion }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar el equipo' });
                }
                return res.json({ message: 'Equipo actualizado exitosamente' });
            });
        });        
    },

    deleteEquipo: (req, res) => {
        const { id } = req.params;

        Equipo.deleteEquipo(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el equipo' });
            }
            return res.json({ message: 'Equipo eliminado exitosamente' });
        });
    },

    activarEquipo: (req, res) => {
        const { id } = req.params;

        Equipo.activarEquipo(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al activar el equipo' });
            }
            return res.json({ message: 'Equipo activado exitosamente' });
        });
    }

};

module.exports = EquipoController;