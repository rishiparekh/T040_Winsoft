const express = require('express');
const router = express.Router();
const DecryptionController = require('../controllers/decrypt');

router.post('/', DecryptionController.decrypt)

module.exports = router