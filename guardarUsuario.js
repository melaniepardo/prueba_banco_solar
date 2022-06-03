const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "espinoza",
    port: 5432,
    database: "bancosolar",
})

//INSERTA USUARIOS
const guardarUsuario = async (usuario) => {
    const values = Object.values(usuario)
    const query = {
        text: "INSERT INTO usuarios (nombre, balance) values ($1, $2)",
        values
    }
    const result = await pool.query(query)
    return result
}
//CONSULTA DE USUARIOS
const getUsuarios = async () => {
    const result = await pool.query("SELECT * FROM usuarios")
    return result.rows
}

module.exports = { guardarUsuario, getUsuarios }