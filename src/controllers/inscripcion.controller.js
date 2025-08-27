const Inscripcion = require('../models/inscripcion.model');
const { validationResult } = require('express-validator');

const InscripcionController = {

    getAllInscripciones: (req, res) => {
        Inscripcion.getAllInscripciones((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener inscripciones' });
            }
            return res.json(results);
        });
    },

    createInscripcion: (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { idperiodo, idmatricula, fecha_inscripcion } = req.body;

        Inscripcion.findByIdMatricula(idmatricula, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al consultar inscripción existente' });
            }

            if (result && result.length > 0) {
                return res.status(400).json({ message: 'Ya existe una inscripción para esta matrícula.' });
            }

            // Si no existe, crear nueva inscripción
            Inscripcion.createInscripcion({ idperiodo, idmatricula, fecha_inscripcion }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear la inscripción' });
                }
                return res.status(201).json({ message: 'Inscripción creada exitosamente' });
            });
        })
    },

    getInscripcionById: (req, res) => {
        const { id } = req.params;

        Inscripcion.getInscripcionById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener inscripción' });
            }
            return res.json(result[0]);
        });
    },

    updateInscripcion: (req, res) => {
        const { id } = req.params;
        const { idperiodo, idmatricula, fecha_inscripcion } = req.body;

        Inscripcion.findByIdMatricula(idmatricula, (err, result) => {  
            if (err) {
                return res.status(500).json({ error: 'Error al consultar inscripción existente' });
            }

            if (result && result.length > 0 && result[0].idinscripcion !== id) {
                return res.status(400).json({ message: 'Ya existe una inscripción para esta matrícula.' });
            }

            Inscripcion.updateInscripcion(id, { idperiodo, idmatricula, fecha_inscripcion }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar la inscripción' });
                }
                return res.json({ message: 'Inscripción actualizada exitosamente' });
            });
        });
    },

    deleteInscripcion: (req, res) => {
        const { id } = req.params;

        Inscripcion.deleteInscripcion(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar la inscripción' });
            }
            return res.json({ message: 'Inscripción eliminada exitosamente' });
        });
    },

    activarInscripcion: (req, res) => {
        const { id } = req.params;

        Inscripcion.activarInscripcion(id, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al activar la inscripción' });
            }
            return res.json({ message: 'Inscripción activada exitosamente' });
        });
    }

}

module.exports = InscripcionController;