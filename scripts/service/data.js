// Express setup
import express from "express"
import contenedor from "../pers/containers/products.js"
import config from "../pers/config.js"

// Stock class
const Contenedor = contenedor
const stock = new Contenedor(config.mariaDb, "products")

// Router

const getData = async () => {
    const data = await stock.getAll()
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
    return data
}



export { getData, getDataById, saveData, updateDataById, deleteI }