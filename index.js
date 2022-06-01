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
}).listen(3000, console.log("SERVER ON"))