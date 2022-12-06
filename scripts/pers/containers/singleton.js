import contenedor from "./products.js" 

let instance = null;


class SingletonClass {
    constructor(server, table) {
        this.value = new contenedor(server, table);

    }

    printValue() {
        console.log(this.value);
    }

    static getInstance() {
        if(!instance) {
            instance = new SingletonClass(server, table);
        }
        return instance;
    }
}

export default SingletonClass