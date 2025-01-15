const express = require('express');
const { getAllBrands, getModelsByBrand } = require('../controllers/carController');

const router = express.Router();

router.get('/marcas', getAllBrands);
router.get('/modelos/:marca', getModelsByBrand);

module.exports = router;
