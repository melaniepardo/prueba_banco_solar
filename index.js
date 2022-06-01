const http = require("http")
const fs = require("fs")
const { guardarUsuario } = require("./consultas");

http.createServer((req, res) => {
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
                res.statusCode = 500
                res.end("Ocurrió un problema en el servidor..." + e)
            }
        })
    }
}).listen(3000, console.log("SERVER ON"))