import express from 'express'
import { upload } from '../config/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { AddProduct, changeStock, productById, productList } from '../controllers/productController.js';


const productRouter = express.Router()

productRouter.post('/add',upload.array("images"),
authSeller,AddProduct);
productRouter.get('/list',productList)
productRouter.get('/id',productById)
productRouter.post('/stock',authSeller,changeStock)





export default productRouter;
