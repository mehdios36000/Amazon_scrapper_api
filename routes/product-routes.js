const express = require('express')
const {getAllProductsComputer,getAllProductsVideoAndAudio,SearchProduct,getTodayDeals}= require('../controllers/ProductController');

const router = express.Router();


router.get('/computer/accessories',getAllProductsComputer);
router.get('/tech/va',getAllProductsVideoAndAudio);
router.post("/search/:search",SearchProduct);
router.get('/today/deals',getTodayDeals);




module.exports ={
    routes:router
}


