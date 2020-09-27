const express = require('express');
const router = express.Router();
const DecryptionController = require('../controllers/decrypt');

router.post('/', DecryptionController.decrypt)

router.get('/history', DecryptionController.get_history)

router.post('/history', DecryptionController.add)

module.exports = router