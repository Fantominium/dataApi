// controllers/csvController.js
const { readData } = require('../Models/dataModel');

const getCsvData = async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch CSV data' });
  }
};

// Export the getCsvData function
module.exports = { getCsvData };
