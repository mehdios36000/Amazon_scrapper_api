'use strict';
const puppeteer = require('puppeteer');
const url_computer="https://www.amazon.com/s?i=specialty-aps&bbn=16225009011&rh=n%3A%2116225009011%2Cn%3A281407&ref=nav_em__nav_desktop_sa_intl_accessories_and_supplies_0_2_5_2"
const url_audio_video="https://www.amazon.com/s?i=computers-intl-ship&bbn=16225007011&rh=n%3A16225007011%2Cn%3A172456%2Cn%3A11548951011&dc&fs=true&ds=v1%3AhGungeZ2bDQ8vvZMlNdIg%2BnFSMrq8Y1rwfOcb9WUUb8&qid=1655840187&rnid=172456&ref=sr_nr_n_1"
const url_search="https://www.amazon.com/s?k=ddd&crid=2J73C7FSO35QU&sprefix=%2Caps%2C395&ref=nb_sb_noss_2";
const url_today_deals="https://www.amazon.com/gp/goldbox/ref=nav_cs_gb_deals";

const ScrapWebProducts = async (url) => {
    const Browser = await puppeteer.launch({ headless: true });
    const Page = await Browser.newPage();
    await Page.goto(url, { waitUntil: 'networkidle2' });
    const products = await Page.evaluate(() => {
        const products = Array.from(document.querySelectorAll('.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20'));
        return products.map(product => {
            const name = product.querySelector('.a-size-base-plus.a-color-base.a-text-normal').innerText;
            let price;
            let BestSeller=true;
            try{
                price= product.querySelector('.a-offscreen').innerText;
                
            }
            catch(err){
                price="not available product";
            }
            if(product.querySelector(".a-badge-label")===null){
                BestSeller=false;
            }
            return { name,price,BestSeller};
        });

    }
    );
    await Browser.close();
    return products;

}

const ScrapWebSearch = async (url,search) => {
    url=url.replace("ddd",search);
    return await ScrapWebProducts(url);
}

const scrapwebTodayDeals=async (url)=>{
    const Browser = await puppeteer.launch({ headless: true });
    const Page = await Browser.newPage();
    await Page.goto(url, { waitUntil: 'networkidle2' });
    const products = await Page.evaluate(() => {
        const products = Array.from(document.querySelectorAll('.DealGridItem-module__dealItem_2X_WLYkJ3-dM0LtXI9THcu.DealGridItem-module__withBorders_2jNNLI6U1oDls7Ten3Dttl.DealGridItem-module__withoutActionButton_2OI8DAanWNRCagYDL2iIqN'));
        return products.map(product => {
            const name = product.querySelector('.DealContent-module__truncate_sWbxETx42ZPStTc9jwySW').innerText;
            let price;
            const discount=product.querySelector(".BadgeAutomatedLabel-module__badgeAutomatedLabel_2Teem9LTaUlj6gBh5R45wd").innerText;
            try{
                price= product.querySelector('.a-price-whole').innerText+"$";
                
            }
            catch(err){
                price="not available product";
            }
            
            return { name,price,discount};
        });

    }
    );
    await Browser.close();
    return products;

}


const getAllProductsComputer = async (req, res,next) => {
    const products = await ScrapWebProducts(url_computer);
    res.status(200).json(products);

}

const getAllProductsVideoAndAudio = async (req, res,next) => {
    const products = await ScrapWebProducts(url_audio_video);
    res.status(200).json(products);
}

const SearchProduct = async (req, res,next) => {
    const {search}=req.params;
    const products = await ScrapWebSearch(url_search,search);
    res.status(200).json(products);
}

const getTodayDeals=async (req,res,next)=>{
    const products=await scrapwebTodayDeals(url_today_deals);
    res.status(200).json(products);


}







module.exports = {
    getAllProductsComputer,
    getAllProductsVideoAndAudio,
    SearchProduct,
    getTodayDeals
}
