// controllers/csvController.js
const { readData, findLargestWeightOnDate, modeTransfer } = require('../Models/dataModel');

const getCsvData = async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch CSV data' });
  }
};
// Controller function to get the largest weight processed on a given date
const getLargestWeightOnDate = async (req, res) => {
    const { date } = req.body;

    try {
      const largestWeightEntry = await findLargestWeightOnDate(date);
  
      if (!largestWeightEntry) {
        return res.status(404).json({ success: false, message: 'No data found for the given date' });
      }
  
      res.status(200).json({ success: true, organization: largestWeightEntry.organization });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve the largest weight' });
    }
  };

  const getModeTransfer = async (req, res) => {
    try {
      const data = await modeTransfer();
      res.status(200).json({success: true, data: data})
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch mode transfer' });
    }
  }
// Export the getCsvData function
module.exports = { getCsvData, getLargestWeightOnDate, getModeTransfer };
