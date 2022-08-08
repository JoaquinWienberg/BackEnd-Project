
const { promises: fs } = require("fs")

class contenedor {
    constructor(data) {
      this.data = data
    }

    // Función para agregar producto nuevo

    async save(title, price, thumbnail) {
      const items = await this.getAll()
      const itemNumber = items.length + 1
      const newItem = {title: title, price: price, thumbnail: thumbnail, id: itemNumber}
      items.push(newItem)
      console.log(items)
      try {
        await fs.writeFile(this.data, JSON.stringify(items))
        console.log(`Escritura exitosa. Id del nuevo producto: ` + newItem.id)
      }
      catch(err)  {
        console.log ("Error de escritura")
      }
    }

    // Obtener producto por su ID

    async getById(idNumber) {
      const allItems = await this.getAll()
      const itemId = allItems.find (product => product.id == idNumber)
      //console.log(itemId)
      return itemId
    }

    // Leer el catalogo de productos
    

    async getAll() {
      try {
        const items = await fs.readFile(this.data, "utf-8");
        console.log("Funcion getAll exitosa")
        return JSON.parse(items)
      } catch (error){
        console.log("Función getAll ha fallado en leer")
        return [];
      }
    }

    // Eliminar todo el contenido del archivo txt

    async deleteAll() {
      try {
        await fs.writeFile(this.data, "[]")
        console.log("deleteAll exitoso!")
      }
      catch (error){
        console.log("Error en eliminación")
      }
    }

    // Eliminar del archivo txt el producto seleccionado por su ID

    async deleteById(idNumber) {
      const items = await this.getAll()
      const remItems = items.filter(info => info.id != idNumber)
    
      try {
        await fs.writeFile(this.data, JSON.stringify(remItems))
        console.log("eliminación por ID exitosa!")
      }
      catch (error) {
        console.log("Error en ejecutar la eliminación por Id")
      }
    }

    // Actualizar información de un producto

    async updateById(idNumber, title, price, thumbnail) {
      const items = await this.getAll()
      const itemPosition = idNumber - 1
      const updatedProduct = {tiltle: title, price: price, thumbnail: thumbnail, id: idNumber}
      items[itemPosition] = updatedProduct;
      try {
        await fs.writeFile(this.data, JSON.stringify(items))
        console.log("deleteAll exitoso!")
      }
      catch (error){
        console.log("Error en eliminación")
      }
    }
}

module.exports = contenedor;

const currentCatalog = new contenedor ("./catalog.txt")








