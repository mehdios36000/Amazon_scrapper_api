const express = require('express')
const {getAllProductsComputer,getAllProductsVideoAndAudio,SearchProduct}= require('../controllers/ProductController');

const router = express.Router();


router.get('/computer/accessories',getAllProductsComputer);
router.get('/tech/va',getAllProductsVideoAndAudio);
router.post("/search/:search",SearchProduct);




module.exports ={
    routes:router
}


