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

module.exports = {
  getAllBrands,
  getModelsByBrand,
};
