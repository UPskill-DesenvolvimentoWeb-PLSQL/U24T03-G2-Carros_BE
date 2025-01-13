const Car = require('../models/carModel');

const getAllBrands = async (req, res) => {
  try {
    const brands = await Car.distinct('brand');
    brands.sort();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch brands', error: error.message });
  }
};

const getModelsByBrand = async (req, res) => {
  try {
    const { marca } = req.params;
    const models = await Car.find({ brand: marca }, 'model -_id').sort({ model: 1 });
    res.status(200).json(models.map(car => car.model));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch models', error: error.message });
  }
};

const getCarsByFirstYear = async (req, res) => {
  try {
    const { brand } = req.params;
    const cars = await Car.find({ brand }).sort({ 'years.0': 1, model: 1 });

    const result = cars.map(car => ({
      brand: car.brand,
      model: car.model,
      firstYear: car.years[0],
      lastYear: car.years[car.years.length - 1],
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars by first year', error: error.message });
  }
};


const getCarsByLastYear = async (req, res) => {
  try {
    const { brand } = req.params;
    const cars = await Car.find({ brand }).sort({ 'years': -1, model: 1 });

    const result = cars.map(car => ({
      brand: car.brand,
      model: car.model,
      firstYear: car.years[0],
      lastYear: car.years[car.years.length - 1],
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars by last year', error: error.message });
  }
};

const getCarsByYear = async (req, res) => {
  try {
    const { brand, year } = req.params;

    const cars = await Car.find({ brand, years: parseInt(year) }).sort({ model: 1 });

    const result = cars.map(car => ({
      brand: car.brand,
      model: car.model,
      firstYear: car.years[0],
      lastYear: car.years[car.years.length - 1],
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch cars by year', error: error.message });
  }
};

module.exports = {
  getAllBrands,
  getModelsByBrand,
  getCarsByFirstYear,
  getCarsByLastYear,
  getCarsByYear,
};
