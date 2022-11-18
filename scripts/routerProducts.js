// Express setup
import express from "express"
import contenedor from "../containers/products.js"
import adminsCheck from "./admin.js"
import config from "./config.js"
import path from "path";
import { fileURLToPath } from 'url';
import logger from "./logger.js";
import {
    productsDaoMongo as productsMongoApi,
    cartDaoMongo as cartsMongoApi
} from './daos/index.js'
import mailNotification from "./notify.js";
import wpNotification from "./mobileNotify.js"
import sendText from "./smsNotify.js";


const { Router } = express;
// Stock class
const Contenedor = contenedor
const stock = productsMongoApi
const cartMongo = cartsMongoApi


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Router
const routerProducts = new Router();
routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended: true}))

routerProducts.get("/productos/:id", async (req, res) => {
    const { id } = req.params;
    const reStock = await stock.getAll()
    const selStock = await stock.getById(parseInt(id))
    if ( parseInt(id) <= reStock.length) {
    res.send(selStock)} else {
    logger.warn("Product not found")
    res.send("Product not found")
    }
})

routerProducts.post("/productos", adminsCheck, async (req, res) => {
    const newProd = req.body
    logger.info(req.body)
    await stock.save(newProd.title, newProd.price, newProd.thumbnail, newProd.time, newProd.desc, newProd.stock, newProd.code)
    logger.info("Post done!")
    //res.json(newProd)
})

routerProducts.put("/productos/:id", adminsCheck, async (req, res) => {
    const { id } = req.params;
    const updatedProd = req.body;
    const reStock = await stock.updateById(id, updatedProd.title, updatedProd.price, updatedProd.thumbnail, updatedProd.time, updatedProd.desc, updatedProd.stock, updatedProd.code);
    res.json(reStock)
})

routerProducts.delete("/productos/:id", adminsCheck, async (req, res) => {
    const { id } = req.params;
    const reStock = await stock.deleteById(id);
    res.json(reStock)
})

routerProducts.get('/productos', async (req, res) => {
    const reStock = await stock.getAll()
    res.json(reStock);
})

routerProducts.post("/cart", adminsCheck, async (req, res) => {
    const newProd = req.body
    let confirmation = `<h4 class="text-center">Products in cart: </h4>
        <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Image</th>
        <th></th>
        </tr>`;

    let mobileConfirmation = "New order created by " + req.user.firstName + " " + req.user.lastName + " " + req.user.email + " .Details: ";

    for (const prods of newProd) {          // Creates order confirmation mail body
        confirmation += `<tr class="product text-dark table-light text-center" id=cartLine${prods._id}>
                        <td>${prods.title}</td>
                        <td>$${prods.price}</td>
                        <td><img src=${prods.thumbnail} width="40px" alt="Product"></td>
                        </tr>`

        mobileConfirmation += `Product: ${prods.title} Price: ${prods.price}`
    }
    
    mailNotification("New order created by " + req.user.firstName + " " + req.user.lastName + " " + req.user.email + " .", "Order confirmed. Details: ", confirmation )
    
    wpNotification(mobileConfirmation)

    sendText("+" + req.user.phone)

    const time = new Date()
    await cartMongo.saveCart({timestamp: time, products: newProd, user: req.user.email})
    console.log("Cart created!")
    res.json("Post Done!")
    //res.json(newProd)
})

routerProducts.get("/cart", adminsCheck, async (req, res) => {
    const mongoItems = await cartMongo.getAllCarts()
    res.json(mongoItems)
})

routerProducts.get("/cart/:id", adminsCheck, async (req, res) => {
    const { id } = req.params;
    const mongoItems = await cartMongo.getCartById(id)
    res.json(mongoItems)
})

routerProducts.put("/cart/:id", adminsCheck, async (req, res) => {
    const { id } = req.params;
    const newProd = req.body
    const time = new Date()
    console.log(req.body)
    await cartMongo.updateCart(id, {title: newProd.title, price: newProd.price, thumbnail: newProd.thumbnail, timestamp: time, desc: newProd.desc, stock: newProd.stock, code: newProd.code})
    console.log("Cart update done!")
    res.json("Update Done!")
    //res.json(newProd)
})

routerProducts.delete("/cart/:id/:code", adminsCheck, async (req, res) => {
    const { id , code } = req.params;
    await cartMongo.deleteProductFromCart(id, code)
    console.log("Product deleted from cart done!")
    res.json("Product deleted from Cart!")
    //res.json(newProd)
})

routerProducts.delete("/cart/:code", adminsCheck, async (req, res) => {
    const { code } = req.params;
    const mongoItems = await cartMongo.deleteCart(code)
    res.json(mongoItems)
})

routerProducts.delete("/cart", adminsCheck, async (req, res) => {
    const mongoItems = await cartMongo.deleteAllCarts()
    res.json(mongoItems)
})




export default routerProducts
