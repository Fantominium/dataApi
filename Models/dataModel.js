const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const {parse, format} = require ('date-fns');

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

const findLargestWeightOnDate = async (searchDate) => {
    try {
      const data = await readData();
  
      
      const parsedSearchDate = parse(searchDate, 'dd/MM/yyyy', new Date());
      const formattedDate = format(parsedSearchDate, 'yyyy-MM-dd');

  
      const filteredData = data.filter(entry => format(new Date(entry.date), 'yyyy-MM-dd') === formattedDate);

  
      if (filteredData.length === 0) {
        return null;
      }
  
      const maxWeightEntry = filteredData.reduce((max, row) =>
        row.weight > max.weight ? row : max
      );
  
      return maxWeightEntry;
    } catch (error) {

      console.error('Error finding largest weight:', error);
      throw error;
    }
  };

// Export the readCSV function
module.exports = { readData, findLargestWeightOnDate };
