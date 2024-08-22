const express = require('express');
const { getCsvData } = require('../Controllers/dataController.js');

const router = express.Router();

// Route to get CSV data
router.get('/', getCsvData);

module.exports= router;
