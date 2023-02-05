import mongoose from 'mongoose'
import config from '../../config/config.js'
import logger from "../../logs/logger.js"

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
.then(logger.info("Mongo DB ON"))


class ContainerMongoDb {

    constructor(collectionName, scheme) {
        this.collection = mongoose.model(collectionName, new mongoose.Schema (scheme))
        this.scheme = new mongoose.Schema(scheme)
    }

    // PRODUCTS METHODS

    async getById(id) {
        let items = await this.collection.find({_id:id})
        if (items == 0) {
            return "invalid id"
        } else {
            return items
        }
    }

    async getByCategory(category) {
        let items = await this.collection.find({category:category})
        return items
    }

    async getAll() {
        let items = await this.collection.find({})
        return items
    }

    async save(newItem) {
        const product = newItem
        const productSaveModel = new this.collection(product);
        let productSave = await productSaveModel.save()
    }

    async updateById(id, updatedItem) {
        let updateItem = await this.collection.updateOne(
            { _id: id }, { $set: {title: updatedItem.title, price: updatedItem.price, thumbnail: updatedItem.thumbnail, timestamp: updatedItem.timestamp, code: updatedItem.code, desc: updatedItem.desc, stock: updatedItem.stock, category: updatedItem.category } 
        })
        logger.info(updateItem)
        return updateItem
    }

    async delete(id) {
        let items = await this.collection.deleteOne({_id:id})
        return items
    }

    async deleteAll() {
        let items = await this.collection.deleteMany({})
        return items
    }

    // CART METHODS

    async getCartById(id) {
        let items = await this.collection.find({_id: id})
        logger.info(items)
        return items
    }

    async getAllCarts() {
        let items = await this.collection.find({})
        return items
    }

    async saveCart(newCart) {
        const createCart = newCart
        const createCartSave = new this.collection(createCart);
        let productSave = await createCartSave.save()
    }

    async updateCart(id, updatedItem) {
        let updateItem = await this.collection.updateOne(
            { _id: id }, { $push: {products: updatedItem } 
        })
        return updateItem
    }

    async deleteProductFromCart(id, productCode) {
        let updateItem = await this.collection.updateOne(
            { _id: id }, { $pull: {products:{_id: productCode}  } 
        })
        return updateItem
    }

    async deleteCart(id) {
        let items = await this.collection.deleteOne({_id: id})
        return items
    }

    async deleteAllCarts() {
        let items = await this.collection.deleteMany({})
        return items
    }

    // ORDER METHODS

    async getAllOrders() {
        let items = await this.collection.find({})
        return items
    }

    async createOrder(time, cartData) {
        let orderTotal = 0;
        for (const data of cartData.products) {
            const total = data.price * data.quantity
            orderTotal += total
        }
        const orderNumber = await this.collection.countDocuments() + 1
        const newOrder = {products: cartData.products, orderNumber: orderNumber, timestamp: time, state: "Generated", email: cartData.email, totalPrice: orderTotal}
        const saveOrder = new this.collection(newOrder)
        let savedOrder = await saveOrder.save()
        return saveOrder;

    }

    // CHAT METHODS

    async getMessagesByUser(user) {
        let items = await this.collection.find({email:user})
        return items
    }

    async getAllMessages() {
        let items = await this.collection.find({})
        return items
    }

    async saveMessage(message) {
        const savedMessage = new this.collection(message);
        let msgSave = await savedMessage.save()
    }
}

export default ContainerMongoDb
