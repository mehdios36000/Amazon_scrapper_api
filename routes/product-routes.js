const express = require('express')
const {getAllProductsComputer}= require('../controllers/ProductController');

const router = express.Router();


router.get('/computer/accessories',getAllProductsComputer);




module.exports ={
    routes:router
}


