const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')

app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

const decryptionRoutes = require('./routes/decrypt');
const mapRoutes = require('./routes/map');

app.use('/api/decryption', decryptionRoutes);
app.use('/api/map', mapRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found...");
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status||500);
    res.json({
        error: {
            message: error.message
        }
    })
})

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})