const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('config/db.config');
//const routes = require('./routes/index.routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

// app.use(cors());
// app.use(express.json());
// app.use('/api', routes);

//Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1);
    }
    console.log('Conexión a la base de datos establecida correctamente');
});

app.listen(port, () => {
    console.log(`ITSUP API ejecutándose en https://api-itsup.luispincay.com:${port}`);
});