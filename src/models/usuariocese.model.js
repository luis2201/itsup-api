const db = require('../config/db'); 

const UsuarioCese = {

    getAllUsuariosCese: (callback) => {
        db.query('SELECT * FROM tb_usuario ORDER BY nombres', callback);
    },

    findByUsuarioCese: (usuarioCeseData, callback) => {
        db.query('SELECT * FROM tb_usuario WHERE usuario = ?', [usuarioCeseData.usuario], callback);
    },

    createUsuarioCese: (usuarioCeseData, callback) => {
        const { nombres, tipousuario, correo, telefono, usuario, contrasena } = usuarioCeseData;

        db.query('INSERT INTO tb_usuario (nombres, tipousuario, correo, telefono, usuario, contrasena) VALUES (?, ?, ?, ?, ?, ?)', [nombres, tipousuario, correo, telefono, usuario, contrasena], callback);
    },

    getUsuarioCeseById: (idusuario, callback) => {        
        db.query('SELECT * FROM tb_usuario WHERE idusuario = ?', [idusuario], callback);
    },

    updateUsuarioCese: (idusuario, usuarioCeseData, callback) => {
        const { nombres, tipousuario, usuario, contrasena } = usuarioCeseData;

        db.query('UPDATE tb_usuario SET nombres = ?, tipousuario = ?, usuario = ?, contrasena = ? WHERE idusuario = ?', [nombres, tipousuario, usuario, contrasena, idusuario], callback);
    },

    deleteUsuarioCese: (idusuario, callback) => {
        db.query('UPDATE tb_usuario SET estado = 0 WHERE idusuario = ?', [idusuario], callback);
    },

    activarUsuarioCese: (idusuario, callback) => {
        db.query('UPDATE tb_usuario SET estado = 1 WHERE idusuario = ?', [idusuario], callback);
    }

}

module.exports = UsuarioCese;