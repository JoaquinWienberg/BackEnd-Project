
const { promises: fs } = require("fs")

class contenedor {
    constructor(data) {
      this.data = data
    }

    // Adds new product

    async save(title, price, thumbnail) {
      const items = await this.getAll()
      const itemNumber = items.length + 1
      const newItem = {title: title, price: price, thumbnail: thumbnail, id: itemNumber}
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
        console.log("Product by ID deleted")
      }
      catch (error) {
        console.log("Error when deleting by ID")
      }
    }

    // Update product information

    async updateById(idNumber, title, price, thumbnail) {
      const items = await this.getAll()
      const itemPosition = idNumber - 1
      const updatedProduct = {tiltle: title, price: price, thumbnail: thumbnail, id: idNumber}
      items[itemPosition] = updatedProduct;
      try {
        await fs.writeFile(this.data, JSON.stringify(items))
        console.log("deleteAll successful")
      }
      catch (error){
        console.log("Error when deleting")
      }
    }
}

module.exports = contenedor;

const currentCatalog = new contenedor ("./catalog.txt")








