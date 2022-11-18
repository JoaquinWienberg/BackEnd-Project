import CartsDaoMongoDb from "./cart/cartDaoMongoDb.js"
import ProductsDaoMongoDb from "./products/productDaoMongoDb.js"

//const { default: ProductsDaoMongoDb } =  ProductsDaoMongoDb
//const { default: CartsDaoMongoDb } =  CartsDaoMongoDb
let productsDaoMongo = new ProductsDaoMongoDb();
let cartDaoMongo = new CartsDaoMongoDb();


export {productsDaoMongo, cartDaoMongo }