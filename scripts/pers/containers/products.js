import faker from "faker";
faker.locale = 'es';

function createProduct() {
  return {
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image()
  }
};

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

    // DESAFIO 28/ 9

    async randomProd () {
      const displayNew = []
      for (let i = 1; i <= 5; i++) {
          const newProd = createProduct()
          displayNew.push(newProd)
      }
      return displayNew
  }

} 

export default contenedor








