const Docente = require('../models/docente.model'); 
const { validationResult } = require('express-validator');

const DocenteController = {

    getAllDocentes: (req, res) => {
        Docente.getAllDocentes((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los docentes' });
            }

            res.json(results);
        });
    },

    getAllDocentesByIdPeriodoCarrera: (req, res) => {
        const { idperiodo, idcarrera } = req.params;

        Docente.getAllDocentesByIdPeriodoCarrera(idperiodo, idcarrera, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los docentes por periodo y carrera' });
            }

            res.json(results);
        });
    },

    createDocente: (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { tipodocumento, numerodocumento, apellido1, apellido2, nombre1, nombre2 } = req.body;

        Docente.findByDocumento({ numerodocumento }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el docente' });
            }

            if (result && result.length > 0) {
                return res.status(400).json({ error: 'El número de identificación ya existe' });
            }

            // Si no existe, crear nuevo docente
            Docente.createDocente({ tipodocumento, numerodocumento, apellido1, apellido2, nombre1, nombre2 }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear el docente' });
                }

                return res.status(201).json({ message: 'Docente creado exitosamente' });
            });
        });
    },

    getDocenteById: (req, res) => {
        const { iddocente } = req.params;

        Docente.getDocenteById(iddocente, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener el docente' });
            }

            return res.json(result[0]);
        });
    },
    

    updateDocente: (req, res) => {
        const { iddocente } = req.params;
        const { tipodocumento, numerodocumento, apellido1, apellido2, nombre1, nombre2 } = req.body;

        Docente.findByDocumento({ numerodocumento }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el docente' });
            }

            if (result && result.length > 0 && result[0].iddocente !== iddocente) {
                return res.status(404).json({ error: 'Ya existe un docente con ese número de identificación' });
            }

            // Si existe, actualizar docente
            Docente.updateDocente(iddocente, { tipodocumento, numerodocumento, apellido1, apellido2, nombre1, nombre2 }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar el docente' });
                }

                return res.json({ message: 'Docente actualizado exitosamente' });
            });
        });
    },

    deleteDocente: (req, res) => {
        const { iddocente } = req.params;

        Docente.deleteDocente(iddocente, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el docente' });
            }

            res.json({ message: 'Docente eliminado exitosamente' });
        });
    },

    activarDocente: (req, res) => {
        const { iddocente } = req.params;

        Docente.activarDocente(iddocente, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al activar el docente' });
            }

            res.json({ message: 'Docente activado exitosamente' });
        });
    }

}

exports.DocenteController = DocenteController;