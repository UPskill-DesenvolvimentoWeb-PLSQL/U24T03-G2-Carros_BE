const express = require('express');
const { getAllBrands, getModelsByBrand, getCarsByFirstYear, getCarsByLastYear, getCarsByYear } = require('../controllers/carController');

const router = express.Router();

router.get('/marcas', getAllBrands);
router.get('/modelos/:marca', getModelsByBrand);
router.get('/cars/:brand/first-year', getCarsByFirstYear);
router.get('/cars/:brand/last-year', getCarsByLastYear);
router.get('/cars/:brand/year/:year', getCarsByYear);

module.exports = router;
