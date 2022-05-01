const express = require("express");
const app = express();

const routerProducts = require("./Routes/routesProducts");
const routerCarts = require("./Routes/routesCarts");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCarts);

app.get("*", function (req, res) {
    res.send({"error":-2, "descripcion": "Ruta Incorrecta"});
});

// Server
const PORT = 8080 || process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
})
server.on('error', error => console.log(`Error en servidor ${error}`))