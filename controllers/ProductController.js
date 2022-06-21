'use strict';
const ProductSchema = require('../models/Product');
const puppeteer = require('puppeteer');

const getAllProductsComputer = async (req, res,next) => {
    const Browser = await puppeteer.launch({ headless: true });
    const Page = await Browser.newPage();
    await Page.goto('https://www.amazon.com/s?i=specialty-aps&bbn=16225009011&rh=n%3A%2116225009011%2Cn%3A281407&ref=nav_em__nav_desktop_sa_intl_accessories_and_supplies_0_2_5_2', { waitUntil: 'networkidle2' });
    const products = await Page.evaluate(() => {
        const products = Array.from(document.querySelectorAll('.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20'));
        console.log(products)
        return products.map(product => {
            const name = product.querySelector('.a-size-base-plus.a-color-base.a-text-normal').innerText;
            let price="";
            try{
                price= product.querySelector('.a-offscreen').innerText;
            }
            catch(err){
                price="not available product";
            }
            return { name,price};
        });

    }
    );
    await Browser.close();
    res.status(200).json(products);

}








module.exports = {
    getAllProductsComputer
}
