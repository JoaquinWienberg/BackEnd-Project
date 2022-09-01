
const { info } = require("console")
const { promises: fs } = require("fs")

class contenedor {
    constructor(data) {
      this.data = data
    }

    // Adds new product

    async save(title, price, thumbnail, time, desc, stock, code) {
      const items = await this.getAll()
      const itemNumber = items.length + 1
      const newItem = {title: title, price: parseInt(price), thumbnail: thumbnail, id: itemNumber, time: time, desc: desc, stock: parseInt(stock), code: code}
      items.push(newItem)
      console.log(items)
      try {
        await fs.writeFile(this.data, JSON.stringify(items))
        console.log(`New product added, id: ` + newItem.id)
      }
      catch(err)  {
        console.log ("Writing error")
      }
    }

    // Get product by ID

    async getById(idNumber) {
      const allItems = await this.getAll()
      const itemId = allItems.find (product => product.id == idNumber)
      //console.log(itemId)
      return itemId
    }

    // Reads the product list
    

    async getAll() {
      try {
        const items = await fs.readFile(this.data, "utf-8");
        console.log("getAll OK")
        return JSON.parse(items)
      } catch (error){
        console.log("GetAll failed")
        return [];
      }
    }

    // Deletes the whole txt product list

    async deleteAll() {
      try {
        await fs.writeFile(this.data, "[]")
        console.log("deleteAll successful!")
      }
      catch (error){
        console.log("Error when deleting")
      }
    }

    // Delete product by ID

    async deleteById(idNumber) {
      const items = await this.getAll()
      const remItems = items.filter(info => info.id != idNumber)
    
      try {
        await fs.writeFile(this.data, JSON.stringify(remItems))
        console.log("Product/Cart by ID deleted")
      }
      catch (error) {
        console.log("Error when deleting by ID")
      }
    }

    // Update product information

    async updateById(idNumber, title, price, thumbnail) {
      const items = await this.getAll()
      const itemPosition = idNumber - 1
      const updatedProduct = {title: title, price: price, thumbnail: thumbnail, id: idNumber}
      items[itemPosition] = updatedProduct;
      try {
        await fs.writeFile(this.data, JSON.stringify(items))
        console.log("deleteAll successful")
      }
      catch (error){
        console.log("Error when deleting")
      }
    }

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

}

module.exports = contenedor;

const currentCatalog = new contenedor ("./catalog.txt")








