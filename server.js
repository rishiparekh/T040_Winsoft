const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan')

app.use(express.json());
app.use(morgan('dev'));

const whitelist = ['http://localhost:3000'];
let corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
}
exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);

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