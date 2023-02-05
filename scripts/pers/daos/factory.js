import CartsDaoMongoDb from "./cart/cartDaoMongoDb.js"
import ProductsDaoMongoDb from "./products/productDaoMongoDb.js"
import OrdersDaoMongoDb from "./orders/orderDaoMongoDb.js";
import ChatDaoMongoDb from "./chat/chatDaoMongoDb.js";

let productsDaoMongo = new ProductsDaoMongoDb();
let cartDaoMongo = new CartsDaoMongoDb();
let orderDaoMongo = new OrdersDaoMongoDb();
let chatDaoMongo = new ChatDaoMongoDb();


export {productsDaoMongo, cartDaoMongo, orderDaoMongo, chatDaoMongo }