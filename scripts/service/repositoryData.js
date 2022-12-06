// Express setup
import { productsDao } from "../pers/DAOS/factory.js"
import { asDto } from "../pers/DTO/productDto.js"

// Stock class

const stock = productsDao

// Data Repository functions

const getData = async () => {
    const data = await stock.getAll()
    const data2 = stock.getInstance()
    console.log(data2)
    return data
}

const getDataById = async () => {
    const data = await stock.getById()
    return data
}

const deleteI = async (id) => {
    const data = await stock.deleteById(id)
    return data
}

const saveData = async (title, price, thumbnail, time, desc, inv, code) => {
    const data = await stock.save(title, price, thumbnail, time, desc, inv, code)
    return data
}

const updateDataById = async (id, title, price, thumbnail, time, desc, inv, code ) => {
    const data = await stock.updateById(id, title, price, thumbnail, time, desc, inv, code)
    return asDto(data)
}



export { getData, getDataById, saveData, updateDataById, deleteI }