const express = require('express');
const { getCsvData, getLargestWeightOnDate } = require('../Controllers/dataController.js');

const router = express.Router();

// Route to get CSV data
router.get('/', getCsvData);

router.post('/largest-weight', getLargestWeightOnDate);


module.exports= router;
