

//const { promises: fs } = require("fs")

import knex from "knex"

class contenedor {
    constructor(config, table) {
      this.knex = knex(config)
      this.table = table
    }

    // Adds new product

    async save(title, price, thumbnail, time, desc, stock, code) {
      try {
        await this.knex(this.table).insert({title: title, price: parseInt(price), thumbnail: thumbnail, timestamp: time, desc: desc, stock: parseInt(stock), code: code})
        console.log(`New product added`)
      }
      catch(err)  {
        console.log(err)
        console.log ("Writing error")
      }
    }

    // Save msg

    async saveMsg (author, time, text) {       
      try {
          await this.knex(this.table).insert({author: author, time: time, text: text})
          console.log(`Message saved`)
      }
      catch (err) {
          console.log(err)
          console.log("Error when saving message")
      }
  }

    // Get product by ID

    async getById(idNumber) {
      try {
        const productById = await this.knex.from(this.table).select('*').where('id', idNumber);
        // return JSON.parse(productById)
        return productById
      }

      catch (err) {
        return []
      }
    }

    // Reads the product list
    

    async getAll() {
      try {
        const items = await this.knex(this.table).select("*")
        console.log("getAll OK")
        return items
      } catch (error){
        console.log(error)
        return [];
      }
    }

    // Deletes the whole txt product list

    async deleteAll() {
      try {
        await this.knex.from(this.table).del()
        console.log("deleteAll successful!")
      }
      catch (error){
        console.log("Error when deleting")
      }
    }

    // Delete product by ID

    async deleteById(idNumber) {
    
      try {
        await this.knex.from(this.table).where('id', idNumber).del()
        console.log("Product/Cart by ID deleted")
      }
      catch (error) {
        console.log("Error when deleting by ID")
      }
    }

    // Update product information

    async updateById(idNumber, title, price, thumbnail, time, desc, stock, code) {
      try {
        await this.knex.from(this.table).where('id', idNumber).update({title: title, price: price, thumbnail: thumbnail, timestamp:time, desc: desc, stock: stock, code: code})
        console.log("Update by ID successful")
      }
      catch (error){
        console.log("Error when udpating by ID")
      }
    }

    /* CART CONTENT
    
    // Create Cart

    async saveCart(cartList) {
      const items = await this.getAll()
      const itemNumber = items.length + 1
      const timestamp = new Date()
      const newItem = {id: itemNumber, date: timestamp, products: cartList}
      items.push(newItem)
      console.log(newItem)
      try {
        await fs.writeFile(this.data, JSON.stringify(items))
        console.log(`New cart added, id: ` + newItem.id)
      }
      catch(err)  {
        console.log ("Writing error")
      }
    }

    // Delete product by id from cart

    async deleteProductFromCart (prodId, cartId) {
      const items = await this.getAll();
      const selectedCart = items.filter(info => info.id == cartId)
      const cartItems = selectedCart[0].products;
      const newCartItems = cartItems.filter(info2 => info2.id != prodId)
      const time = new Date() 
      const newCart = {id: cartId, time: time, products: newCartItems}
      const filteredItems = items.filter(info3 => info3.id != cartId)
      filteredItems.push(newCart)
      try {
        await fs.writeFile(this.data, JSON.stringify(filteredItems))
        console.log("deleted product from cart successful")
      }
      catch (error){
        console.log("Error when deleting product from cart")
      }

    }

    // Add product by ID to cart

    async addProductToCart (prodId, cartId, prod) {
      const items = await this.getAll();
      const selectedCart = items.filter(info => info.id == cartId)
      selectedCart[0].products.push(prod)
      const filteredItems = items.filter(info2 => info2.id != cartId)
      filteredItems.push(selectedCart)
      try {
        await fs.writeFile(this.data, JSON.stringify(filteredItems))
        console.log("Successfuly added product to cart")
      }
      catch (error){
        console.log("Error when adding product to cart")
      }
    }
    */
} 

export default contenedor








