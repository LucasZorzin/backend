const fs = require("fs");
const timestamp = Date.now();

class cart {

    constructor(fileName) {
        this.fileName = `../api/${fileName}.txt`;
    }

    // OBTENER TODOS LOS CARRITOS
    async getAll() {
        try {
            let getCarts = await fs.promises.readFile(`${this.fileName}`, "utf-8");
            return JSON.parse(getCarts);
        }
        catch (err) {
            console.log(`ERROR: ${err}`);
            return [];
        }
    }

    // CREAR CARRITO
    async save(data) {
        try {
            let carrito = await this.getAll();
            let id = 1;
            let productos = [];
            if (carrito.length > 0) {
                id = carrito[carrito.length - 1].id + 1;
            }
            carrito.push({ id: id, timestamp: timestamp, ...data, productos: productos, });
            await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(carrito, null, 2));
            return id;
        }
        catch (error) {
            return (`Se ha encontrado el siguiente error: ${error}`);
        }
    }

    // VACIAR Y ELIMINAR UN CARRITO SEGÚN ID
    async deleteCartById(id) {
        const idCart = await this.getAll();
        const index = idCart.findIndex((e) => e.id === Number(id));
        if (index == -1) {
            return (`Error: no se ha enocntrado ningún carrito con el ID: ${id}`)
        }
        idCart.splice(index, 1);
        try {
            fs.promises.writeFile(this.fileName, JSON.stringify(idCart, null, 2));
        }
        catch (error) {
            return (`Error: ${error}`);
        }
    }

    // VER PRODUCTOS GUARDADOS EN EL CARRITO SEGUN EL ID DE ESTE
    async getById(id) {
        try {
            const cart = JSON.parse(await fs.promises.readFile(`${this.fileName}`, "utf-8"));
            const cartFinal = cart.filter((elemento) => elemento.id === Number(id))[0]
            return cartFinal.productos;
        }
        catch (error) {
            return (`error: No se ha encontrado ningún producto con el ID: ${id} | ${error}`);
        }
    }

    // AGREGAR PRODUCTOS AL CARRITO SEGUN EL ID DE ESTE
    async addProdToCartById(id, body) {
        const idCart = JSON.parse(await fs.promises.readFile(`${this.fileName}`, 'utf-8'))
        if ((id - 1) == -1) {
            return (`error: No se encontró el carrito id ${id}`);
        }
        const prodToFind = idCart[id - 1].productos;
        prodToFind.push(body)
        idCart[id - 1].productos = prodToFind;
        // Paso los datos a un archivo
        await fs.promises.writeFile(`${this.fileName}`, JSON.stringify(idCart));
        return (idCart)
    }

    //ELIMINAR UN PRODUCTO DE UN CARRITO SEGUN SUS ID'S
    async deleteById(id, idProd) {
        const idCart = await this.getAll();
        if ((id - 1) == -1) {
            return (`error: ID ${id} no encontrado`);
        }
        delete idCart[id - 1].productos[idProd - 1];
        try {
            fs.promises.writeFile(this.fileName, JSON.stringify(idCart));
        } catch (error) {
            return (`error: ${error}`);
        }
        return idCart;
    }
}

module.exports = cart;