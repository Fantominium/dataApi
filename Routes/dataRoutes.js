const express = require('express');
const { getCsvData, getLargestWeightOnDate, getModeTransfer } = require('../Controllers/dataController.js');

const router = express.Router();

// Route to get CSV data
router.get('/', getCsvData);

router.post('/largest-weight', getLargestWeightOnDate);

router.get ('/getModeTransfer', getModeTransfer);


module.exports= router;
