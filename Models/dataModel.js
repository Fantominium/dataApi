const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');

// Construct the path to the CSV file
const dataPath = path.join(__dirname, '../data/transfers.csv');

// Function to validate UUID (simple regex check)
const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

// Function to process a single row of the CSV file
const processRow = (row) => {
  const organization = isValidUUID(row.organization) ? row.organization : null;
  const from_material = isValidUUID(row.from_material) ? row.from_material : null;
  const to_material = isValidUUID(row.to_material) ? row.to_material : null;
  const weight = parseInt(row.weight, 10);
  const date = new Date(row.date);

  if (organization && from_material && to_material && !isNaN(weight) && date instanceof Date && !isNaN(date)) {
    return { organization, from_material, to_material, weight, date };
  } else {
    console.warn(`Invalid data found in row: ${JSON.stringify(row)}`);
    return null;
  }
};

// Function to read and process the CSV file using streams
const readData = () => {
  return new Promise((resolve, reject) => {
    const data = [];

    fs.createReadStream(dataPath)
      .pipe(csvParser())
      .on('data', (row) => {
        const processedRow = processRow(row);
        if (processedRow) {
          data.push(processedRow);
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        resolve(data);
      })
      .on('error', (error) => {
        console.error('Error reading the CSV file:', error);
        reject(error);
      });
  });
};

// Export the readCSV function
module.exports = { readData };
