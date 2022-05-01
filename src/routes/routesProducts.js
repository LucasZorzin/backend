const express = require("express");
const { Router } = express;
const routerProducts = new Router();
const fs = require('fs');

// Doy acceso TRUE por defecto (es decir, dministrador)
let administrador = true;

// Obtengo los productos del txt
let products = [];
const productosAuxi = async () => {
    const prod = await fs.promises.readFile(`../api/products.txt`, 'utf-8');
    products.push(await JSON.parse(prod));
}
productosAuxi();

// VER TODOS LOS PRODUCTOS
routerProducts.get("/", async (req, res) => {
    res.json(products[0]);
});

// VER PRODUCTO POR ID
routerProducts.get("/:id", async (req, res) => {
    const param = req.params.id;
    res.json(await products[0][param - 1]);
});

if (administrador === true) {
    // AGREGAR PRODUCTOS
    routerProducts.post("/", async (req, res) => {
        let productAux = { "id": products.length + 1, "timestamp": Date.now() }
        const finalProduct = Object.assign(productAux, req.body);
        products[0].push(finalProduct);
        // Paso los datos a un archivo
        await fs.promises.writeFile(`../api/products.txt`, JSON.stringify(products));
        res.json(await products[0]);
    });
    // ACTUALIZAR PRODUCTO
    routerProducts.put('/:id', async (req, res) => {
        const id = req.params.id;
        products[0][id - 1] = req.body;
        // Paso los datos a un archivo
        await fs.promises.writeFile(`../api/products.txt`, JSON.stringify(products));
        res.json(await products[0]);
    })
    // ELIMINAR PRODUCTO
    routerProducts.delete('/:id', async (req, res) => {
        const id = req.params.id;
        products[0].splice(id - 1, 1)
        // Paso los datos a un archivo
        await fs.promises.writeFile(`../api/products.txt`, JSON.stringify(products));
        res.json(await products[0]);
    });
}
else {
    routerProducts.post('/', (req, res) => { res.json({ error: -1, descripcion: "ruta '/personas' método 'Post' no autorizada" }) })
    routerProducts.put('/:id', (req, res) => { res.json({ error: -1, descripcion: "ruta '/personas' método 'Put' no autorizada" }) })
    routerProducts.delete('/:id', (req, res) => { res.json({ error: -1, descripcion: "ruta '/personas' método 'Delete' no autorizada" }) })
}

module.exports = routerProducts;