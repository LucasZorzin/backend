const express = require("express");
const { Router } = express;
const routerCarts = new Router();
const fs = require('fs');

const cart = require("../../api/cart.js");
const carritos = new cart("carritos");

// CREAR CARRITO
routerCarts.post("/", async (req, res) => {
    res.json(await carritos.save(req.body));
});

// VACIAR Y ELIMINAR UN CARRITO SEGÚN ID
routerCarts.delete("/:id", async (req, res) => {
    const id = req.params.id;
    res.json(await carritos.deleteCartById(id));
});

// VER PRODUCTOS GUARDADOS EN EL CARRITO SEGUN EL ID DE ESTE
routerCarts.get("/:id/productos", async (req, res) => {
    const id = req.params.id;
    res.json(await carritos.getById(id));
});

// AGREGAR PRODUCTOS AL CARRITO SEGUN EL ID DE ESTE
routerCarts.post("/:id/productos", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    res.json(await carritos.addProdToCartById(id, body));
});

//ELIMINAR UN PRODUCTO DE UN CARRITO SEGUN SUS ID'S
routerCarts.delete("/:id/productos/:id_prod", async (req, res) => {
        const idProd = req.params.id_prod;
        const id = req.params.id;
        res.json(await carritos.deleteById(id, idProd));
    }
);

module.exports = routerCarts;