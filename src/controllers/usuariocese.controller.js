const UsuarioCese = require('../models/usuariocese.model');
const { validationResult } = require('express-validator');

const UsuarioCeseController = {

    getAllUsuariosCese: (req, res) => {
        UsuarioCese.getAllUsuariosCese((err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los usuarios' });
            }

            res.json(results);
        });
    },

    createUsuarioCese: (req, res) => {        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombres, tipousuario, correo, telefono, usuario, contrasena } = req.body;

        UsuarioCese.findByUsuarioCese({ usuario }, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el usuario' });
            }

            if(result && result.length > 0) {
                return res.status(400).json({ error: 'El usuario ya existe' });
            }

            //Si no existe, crear nuevo usuario
            UsuarioCese.createUsuarioCese({ nombres, tipousuario, correo, telefono, usuario, contrasena }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al crear el usuario' });
                }

                return res.status(201).json({ message: 'Usuario creado exitosamente' });
            });
            
        });
    },

    getUsuarioCeseById: (req, res) => {        
        const { id } = req.params;

        UsuarioCese.getUsuarioCeseById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el usuario' });
            }
            
            return res.json(result[0]);
        });
    },

    updateUsuarioCese: (req, res) => {
        const { id } = req.params;
        const { nombres, tipousuario, correo, telefono, usuario, contrasena } = req.body;

        UsuarioCese.findByUsuarioCese(usuario, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error al buscar el usuario' });
            }

            if (result && result.length > 0 && result[0].idusuario !== id) {
                return res.status(404).json({ error: 'Ya existe un usuario registrado con anterioridad' });
            }

            UsuarioCese.updateUsuarioCese(id, { nombres, tipousuario, correo, telefono, usuario, contrasena }, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Error al actualizar el usuario' });
                }

                return res.json({ message: 'Usuario actualizado exitosamente' });
            });
        });
    },

    deleteUsuarioCese: (req, res) => {
        const { idusuario } = req.params;

        UsuarioCese.deleteUsuarioCese(idusuario, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al eliminar el usuario' });
            }

            return res.json({ message: 'Usuario eliminado exitosamente' });
        });
    },

    activarUsuarioCese: (req, res) => {
        const { idusuario } = req.params;

        UsuarioCese.activarUsuarioCese(idusuario, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al activar el usuario' });
            }

            return res.json({ message: 'Usuario activado exitosamente' });
        });
    }

};

module.exports = UsuarioCeseController;