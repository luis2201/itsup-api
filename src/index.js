const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
//const routes = require('./routes/index.routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;

// app.use(cors());
// app.use(express.json());
// app.use('/api', routes);

app.listen(port, () => {
    console.log(`ITSUP API ejecutándose en https://api-itsup.luispincay.com:${port}`);
});