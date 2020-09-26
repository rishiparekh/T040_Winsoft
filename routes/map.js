const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map');

router.post('/get-desired-location', MapController.get_desired_location)

module.exports = router