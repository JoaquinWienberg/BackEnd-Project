// Express setup
import express from "express"
import adminsCheck from "../middlewares/admin.js"
import path from "path";
import { fileURLToPath } from 'url';
import { getStock, getStockById, createStock, updateStock, deleteStock, getStockByCategory, createCart, getCarts, getCartById, updateCartById, deleteProductFromCart, deleteCart, deleteAllCarts, getOrders, createOrder, getChats, getChatsFromUser, createMessage} from "../controllers/processData.js"


const { Router } = express;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Router
const routerProducts = new Router();
routerProducts.use(express.json())
routerProducts.use(express.urlencoded({extended: true}))

// PRODUCT PATHS

routerProducts.get("/products/:id", getStockById)

routerProducts.get("/products/category/:category", getStockByCategory)

routerProducts.post("/products", createStock)

routerProducts.put("/products/:id", adminsCheck, updateStock)

routerProducts.delete("/products/:id", adminsCheck, deleteStock)

routerProducts.get('/products', getStock)

// CART PATHS

routerProducts.post("/cart", createCart)

routerProducts.get("/cart", adminsCheck, getCarts)

routerProducts.get("/cart/:id", adminsCheck, getCartById)

routerProducts.put("/cart/:id", adminsCheck, updateCartById)

routerProducts.delete("/cart/:id/:productId", adminsCheck, deleteProductFromCart)

routerProducts.delete("/cart/:code", adminsCheck, deleteCart)

routerProducts.delete("/cart", adminsCheck, deleteAllCarts)

// ORDER PATHS

routerProducts.get("/order", getOrders)

routerProducts.post("/order", createOrder)

// CHAT PATHS

routerProducts.get("/chat", getChats)

routerProducts.get("/chat/:user", getChatsFromUser)

routerProducts.post("/chat", createMessage)

export default routerProducts
