import  express  from "express";

import {  createProductController, deleteProductController, getProductController, getsingleProductController, productCountController, productFilterController, productListController, productPhotoController, searchProductController, updateProductController } from "../controllers/productContoller.js";

const router = express.Router();

//routes


//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug" , getsingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//filter product
router.post('/product-filters' , productFilterController);

//product count
router.get('/product-count' , productCountController);

//product per page
router.get('/product-list/:page' , productListController);

//search product
router.get('/search/:keyword' , searchProductController);

export default router;