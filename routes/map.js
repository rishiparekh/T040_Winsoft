const express = require('express');
const router = express.Router();
const MapController = require('../controllers/map');

router.post('/get-desired-location', MapController.get_desired_location)

router.get('/', MapController.get_all_maps_brief_details)

router.get('/:id', MapController.get_one_map)

module.exports = router