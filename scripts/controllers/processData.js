import { getData as getDataDB, getDataById as getDataByIDDB, saveData as saveDataDB, updateDataById as updateDataByIDDB, deleteI as deleteDataByIdDB, getDataByCategoryDB } from "../service/repositoryData.js"
import mailNotification from "../service/notify.js";
import { cartDaoMongo, orderDaoMongo, chatDaoMongo } from "../pers/daos/factory.js";
import logger from "../logs/logger.js";

// FACTORY SETTING

const cartMongo = cartDaoMongo
const orderMongo = orderDaoMongo
const chatsMongo = chatDaoMongo

// PRODUCTS

const getStock = async (req, res) => {
    const reStock = await getDataDB();
    res.send(reStock)
}

const getStockById = async (req, res) => {
    const { id } = req.params;
    const reStock = await getDataDB()
    const selStock = await getDataByIDDB(id)
    res.send(selStock)
}

const getStockByCategory = async (req, res) => {
    const { category } = req.params;
    const reStock = await getDataDB()
    const selStock = await getDataByCategoryDB(category)
    res.send(selStock)
}

const createStock = async (req, res) => {
    const newProd = req.body
    const time = new Date()
    const validProd = { title: newProd.title, price: newProd.price, thumbnail: newProd.thumbnail, timestamp:time, desc: newProd.desc, stock: newProd.stock, code: newProd.code, category: newProd.category}
    await saveDataDB(validProd)
    logger.info("Post done!")
    res.json(validProd)
}

const updateStock = async (req, res) => {
    const { id } = req.params;
    const updatedProd = req.body;
    const validUpdatedProd = { title: updatedProd.title, price: updatedProd.price, thumbnail: updatedProd.thumbnail, time:updatedProd.time, desc: updatedProd.desc, stock: updatedProd.stock, code: updatedProd.code, category: updatedProd.category}
    const reStock = await updateDataByIDDB(id, validUpdatedProd);
    res.json("Update complete")
}

const deleteStock = async (req, res) => {
    const { id } = req.params;
    const reStock = await deleteDataByIdDB(id);
    res.json("delete complete")
}

// CART

const createCart = async (req, res) => {
    const cartInfo = req.body
    const time = new Date()
    await cartMongo.saveCart({timestamp: time, products: cartInfo.products, email: cartInfo.email, location: cartInfo.location})
    logger.info("Cart created!")
    res.json("Cart successfully created!")
}

const getCarts = async (req, res) => {
    const mongoItems = await cartMongo.getAllCarts()
    res.json(mongoItems)
}

const getCartById = async (req, res) => {
    const { id } = req.params;
    const mongoItems = await cartMongo.getCartById(id)
    res.json(mongoItems)
}

const updateCartById = async (req, res) => {
    const { id } = req.params;
    const newProd = req.body
    const time = new Date()
    await cartMongo.updateCart(id, {_id: newProd.id, title: newProd.title, price: newProd.price, quantity: newProd.quantity})
    logger.info("Cart update done!")
    res.json("Update Done!")
    //res.json(newProd)
}

const deleteProductFromCart = async (req, res) => {
    const { id , productId } = req.params;
    await cartMongo.deleteProductFromCart(id, productId)
    logger.info("Product deleted from cart done!")
    res.json("Product deleted from Cart!")
    //res.json(newProd)
}

const deleteCart = async (req, res) => {
    const { code } = req.params;
    const mongoItems = await cartMongo.deleteCart(code)
    res.json(mongoItems)
}

const deleteAllCarts = async (req, res) => {
    const mongoItems = await cartMongo.deleteAllCarts()
    res.json(mongoItems)
}

// ORDERS

const getOrders = async (req, res) => {
    const mongoItems = await orderMongo.getAllOrders()
    res.json(mongoItems)
}

const createOrder = async (req, res) => {
    const cartID = req.body
    const cartToOrder = await cartMongo.getCartById(cartID.cart)
    const timestamp = new Date()
    await orderMongo.createOrder(timestamp, cartToOrder[0])

    let confirmation = `<h4 class="text-center">Products in cart: </h4>
    <tr>
    <th>Product</th>
    <th>Price</th>
    <th>Amount</th>
    <th></th>
    </tr>`;

    for (const prods of cartToOrder[0].products) {          // Creates order confirmation mail body
        confirmation += `<tr class="product text-dark table-light text-center" id=cartLine${prods._id}>
                        <td>${prods.title}</td>
                        <td>$${prods.price}</td>
                        <td>${prods.quantity}</td>
                        </tr>`
    }

    mailNotification("New order created by " + cartToOrder[0].email + " .", "Order confirmed. Details: ", confirmation, cartToOrder[0].email )

    logger.info("Order created!")
    res.json("Order successfully created!")
}

// CHAT

const getChats = async (req, res) => {
    const messages = await chatsMongo.getAllMessages();
    res.send(reStock)
}

const getChatsFromUser = async (req, res) => {
    const { user } = req.params;
    const messages = await chatsMongo.getMessagesByUser(user)
    res.send(messages)
}

const createMessage = async (req, res) => {
    const newMessage = req.body
    const validMessage = { email: newMessage.email, type: "User", timestamp: newMessage.time, message: newMessage.message};
    await chatsMongo.saveMessage(validMessage)
    logger.info("Message sent!")
    res.json("Message sent!")
}

export { getStock, getStockById, createStock, updateStock, deleteStock, getStockByCategory, createCart, getCarts, getCartById, updateCartById, deleteProductFromCart, deleteCart, deleteAllCarts, getOrders, createOrder, getChats, getChatsFromUser, createMessage}