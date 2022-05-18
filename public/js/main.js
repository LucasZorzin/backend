const socket = io.connect();

function addProduct(e) {
    event.preventDefault();
    const product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
    };
    socket.emit('new-product', product);
    alert("Producto agregado correctamente!");
    return false;
}

function makeHtmlTable(products) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ products });
            document.getElementById('products').innerHTML = html;
            return html;
        })
}

socket.on('products', products => {
    makeHtmlTable(products);
});

function render(messages) {
    const html = messages.map((message, index) => {
        return (`<div>
                    <p class="author">${message.author} <span class="date">[${message.date}]</span>: <span class="text">${message.text}</span> </p>
                </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    event.preventDefault();
    const message = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value,
        date: new Date().toLocaleString("es-ES", {
            dateStyle: "short",
            timeStyle: "short"
        })
    };
    socket.emit('new-message', message);
    return false;
}

socket.on('messages', data => {
    render(data);
});