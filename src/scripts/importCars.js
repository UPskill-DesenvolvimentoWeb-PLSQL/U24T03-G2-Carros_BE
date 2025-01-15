const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Car = require('../models/carModel');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Using Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

const importCars = async () => {
  const cars = [];
  const filePath = './data/ProjectDB.csv';

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    console.log('Ensure the file is in the "data" folder and named "ProjectDB.csv".');
    process.exit(1);
  }

  fs.createReadStream(filePath)
    .pipe(csv({ separator: ';', headers: ['Brand', 'Model', 'StartYear', 'EndYear'] }))
    .on('data', (row) => {
      try {
        cars.push({
          brand: row['Brand'],
          model: row['Model'],
        });
      } catch (err) {
        console.error(`Error processing row: ${JSON.stringify(row)} - ${err.message}`);
      }
    })
    .on('end', async () => {
      console.log('CSV file processed. Preparing to insert data into MongoDB.');
      try {
        await Car.deleteMany();
        await Car.insertMany(cars);
        console.log('Cars imported successfully!');
        process.exit();
      } catch (error) {
        console.error('Error importing cars:', error.message);
        process.exit(1);
      }
    })
    .on('error', (error) => {
      console.error('Error reading the CSV file:', error.message);
      process.exit(1);
    });
};

connectDB().then(importCars);
