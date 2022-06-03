const http = require("http")
const fs = require("fs")
const url = require("url")
const { pool } = require("./config");
const { guardarUsuario } = require("./guardarUsuario");
const { getUsuarios } = require("./guardarUsuario");
const { nuevaTransaccion } = require("./nuevaTransaccion");
const { getTransferencias } = require("./getTransferencias");
// const { transferir } = require("./funciona");
const { editarUsuario } = require("./editarUsuario");
const { eliminarUsuario } = require("./eliminarUsuario");
const { guardarTransferencia } = require("./nuevaTransaccion");


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
    // pool.connect(async (err, cliente, release) => {
        // if (err) {
        //     return console.error(err.code)
        // }
        // if (nuevaTransaccion === 'nuevaTransaccion') {
        //     await nuevaTransaccion(cliente)
        // }
        // if (getTransferencias === 'getTransferencias') {
        //     await getTransferencias(cliente)
        // }
        // if (guardarTransferencia === 'guardarTransferencia') {
        // await guardarTransferencia(cliente)
        // }
        // release()
        // pool.end()
    // })

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

    // transferencias
    if (req.url == "/transferencia" && req.method == "POST") {
        let body = ''
        req.on("data", (chunk) => {
            body += chunk//.toString()
        })
        req.on("end", async () => {
            console.log(body)
            const datos = Object.values(JSON.parse(body))
            const respuesta = await nuevaTransaccion(datos)//ojo con respuesta
            res.writeHead(201, { 'content-type': 'application/json' })
            res.end(JSON.stringify(respuesta, null, 1))
        })
    }
    //         try {
    //             const result = await guardarTransferencia(transferencia)
    //             res.statusCode = 201
    //         } catch (e) {
    //             console.log(e)
    //             res.statusCode = 500
    //             res.end("Ocurrió un problema en el servidor..." + e)
    //         }
    //     })
    // }
    if (req.url == "/transferencias" && req.method == "GET") {
        try {
            const transferencias = await getTransferencias();
            res.writeHead(200, {'content-type': 'aplication/json'})
            res.end(JSON.stringify(transferencias))
        } catch (e) {
            res.statusCode = 500
            res.end("Ocurrió un problema con el servidor..." + e)
        }
    }
    if (req.url.startsWith('/usuario?') && req.method == "PUT") {
        const { id } = url.parse(req.url,true).query
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", async () => {
            const datos = Object.values(JSON.parse(body))
            const respuesta = await editarUsuario(datos, id)
            res.end(JSON.stringify(respuesta));
        });
    }
    if (req.url.startsWith("/usuario?") && req.method == "DELETE") {
        const { id } = url.parse(req.url, true).query;
        const respuesta = await eliminarUsuario(id);
        res.end(JSON.stringify(respuesta));
    }
}).listen(3000, console.log("SERVER ON"))