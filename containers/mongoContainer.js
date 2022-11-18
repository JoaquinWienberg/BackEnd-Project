import mongoose, { model } from 'mongoose'
import config from '../scripts/config.js'
import logger from "../scripts/logger.js"

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)
.then(logger.info("Mongo DB ON"))


class ContainerMongoDb {

    constructor(collectionName, scheme) {
        this.collection = mongoose.model(collectionName, new mongoose.Schema (scheme))
        this.scheme = new mongoose.Schema(scheme)
    }

    // PRODUCTS METHODS

    async getById(code) {
        let items = await this.collection.find({code:code})
        console.log(items)
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

    async update(code, updatedItem) {
        let updateItem = await this.collection.updateOne(
            { code: code }, { $set: {title: updatedItem.title, price: updatedItem.price, thumbnail: updatedItem.thumbnail, timestamp: updatedItem.timestamp, code: updatedItem.code, desc: updatedItem.desc, stock: updatedItem.stock } 
        })
        logger.info(updateItem)
        return updateItem
    }

    async delete(code) {
        let items = await this.collection.deleteOne({code:code})
        console.log(items)
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
            { _id: id }, { $pull: {products:{code: productCode}  } 
        })
        return updateItem
    }

    async deleteCart(id) {
        let items = await this.collection.deleteOne({_id: id})
        console.log(items)
        return items
    }

    async deleteAllCarts() {
        let items = await this.collection.deleteMany({})
        return items
    }
}

export default ContainerMongoDb

//const test1 = new ContainerMongoDb("products", schemi)

//test1.save(1)