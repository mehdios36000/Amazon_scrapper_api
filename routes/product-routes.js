const express = require('express')
const {getAllProductsComputer,getAllProductsVideoAndAudio}= require('../controllers/ProductController');

const router = express.Router();


router.get('/computer/accessories',getAllProductsComputer);
router.get('/tech/va',getAllProductsVideoAndAudio);




module.exports ={
    routes:router
}


