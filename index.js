const http = require("http")
const fs = require("fs")
const { guardarUsuario } = require("./consultas");
const { getUsuarios } = require("./consultas");
const { getTransferencias } = require("./consultas");

http.createServer(async (req, res) => {
    if (req.url == "/" && req.method == "GET") {
        fs.readFile("index.html", (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end()
            } else {
                res.setHeader("Content-type", "text/html")
                res.end(data)
            }
        })
    }
    if (req.url == "/usuario" && req.method == "POST") {
        let body = ""
        req.on("data", (chunk) => {
            body = chunk.toString()
        })
        req.on("end", async () => {
            const usuario = JSON.parse(body)
            try {
                const result = await guardarUsuario(usuario)
                res.statusCode = 201
            } catch (e) {
                console.log(e)
                res.statusCode = 500
                res.end("Ocurrió un problema en el servidor..." + e)
            }
        })
    }
    if (req.url == "/usuarios" && req.method == "GET") {
        try {
            const usuarios = await getUsuarios();
            res.end(JSON.stringify(usuarios))
        } catch (e) {
            res.statusCode = 500
            res.end("Ocurrió un problema con el servidor..." + e)
        }
    }
    if (req.url == "/transferencias" && req.method == "GET") {
        try {
            const transferencias = await getTransferencias();
            res.end(JSON.stringify(transferencias))
        } catch (e) {
            res.statusCode = 500
            res.end("Ocurrió un problema con el servidor..." + e)
        }
    }
    //guardar las transferencias
    if (req.url == "/transferencia" && req.method == "POST") {
        let body = ""
        req.on("data", (chunk) => {
            body = chunk.toString()
        })
        req.on("end", async () => {
            const transferencia = JSON.parse(body)
            try {
                const result = await guardarTransferencia(transferencia)
                res.statusCode = 201
            } catch (e) {
                console.log(e)
                res.statusCode = 500
                res.end("Ocurrió un problema en el servidor..." + e)
            }
        })
    }
    if (req.url == "/usuario" && req.method == "PUT") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const datosJson = JSON.parse(body)
            const datos = [
                datosJson.id,
                datosJson.nombre
            ]
            const respuesta = await editar(datos);
            res.end(JSON.stringify(respuesta));
        });
    }
    if (req.url.startsWith("/usuario?") && req.method == "DELETE") {
        const { id } = url.parse(req.url, true).query;
        const respuesta = await eliminarUsuario(id);
        res.end(JSON.stringify(respuesta));
    }
}).listen(3000, console.log("SERVER ON"))