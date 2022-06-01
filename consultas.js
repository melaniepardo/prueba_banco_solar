const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "espinoza",
    port: 5432,
    database: "bancosolar",
})

const guardarUsuario = async(consulta) => {
    const values = Object.values(usurio)
    const query = {
        text: "INSERT INTO usuarios (nombre, balance) values ($1, $2)",
        values
    }
    const result = await pool.query(query)
    return result
}
module.exports = { guardarUsuario }