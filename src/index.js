const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth.routes');
const permissionRoutes = require('./routes/permission.routes');
const configuracionRoutes = require('./routes/configuracion.routes');
const inscripcionRoutes = require('./routes/inscripcion.routes');
const asistenciaRoutes = require('./routes/asistencia.routes');
const clienteRoutes = require('./routes/cliente.routes');
const equipoRoutes = require('./routes/equipo.routes');
const actaRecepcionRoutes = require('./routes/actarecepcion.routes');
const actaEntregaRoutes = require('./routes/actaentrega.routes');

const db = require('./config/db');
const app = express();

dotenv.config();

// Obtener los orígenes permitidos desde el archivo .env
const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
  : [];

// Configuración de CORS
// Permitir orígenes específicos o sin origen
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir sin origin (por ejemplo, en herramientas como curl o Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`CORS bloqueado para origen: ${origin}`);
        callback(null, false); // No lanza error
      }
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

app.use(cors(corsOptions));

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        process.exit(1);
    }
    console.log('Conectado a la base de datos MySQL');
});

// Configuración
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/configuraciones', configuracionRoutes);
app.use('/api/inscripciones', inscripcionRoutes);
app.use('/api/asistencias', asistenciaRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/equipos', equipoRoutes);
app.use('/api/actas-recepcion', actaRecepcionRoutes);
app.use('/api/actas-entrega', actaEntregaRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
