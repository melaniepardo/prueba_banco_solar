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

// MODIFICA USUARIOS Y tabla transacciones
const nuevaTransaccion = async (cliente) => {
    const emisor = {
        text: 'UPDATE usuarios SET balance = saldo - $1 WHERE id = $2',
        values: [nombre, id]
    }
    const receptor = {
        text: 'UPDATE usuarios SET balance = saldo + $1 WHERE id = $2',
        values: [nombre, id]
    }
    try {
        await cliente.query('BEGIN')
        await cliente.query(emisor)
        await cliente.query(receptor)
        console.log('Operación realizada con éxito')
        const results = await cliente.query(registrar)
        await cliente.query('COMMIT')
        console.log('Operación registrada con éxito')
    } catch (error) {
        console.log(results)
        await cliente.query('ROLLBACK')
        console.error(error)
    }
}
const getTransferencias = async () => {
    const result = await pool.query("SELECT * FROM transferencias")
    return result.rows
}
// const editarUsuario = async (datos) => {
//     const consulta = {
//         text: `UPDATE usuarios SET id = $1, nombre = $2 = WHERE id = $1 RETURNING *`,
//         values: datos,
//     };
//     try {
//         const result = await pool.query(consulta);
//         console.log(result);
//         return result;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// };


// const eliminarUsuario = async (id) => {
//     try {
//         const result = await pool.query(
//             `DELETE FROM usuarios WHERE id = ${id} `
//         );
//         return result;
//     } catch (error) {
//         console.log(error.code);
//         return error;
//     }
// }

module.exports = { guardarUsuario, getUsuarios, nuevaTransaccion, getTransferencias, eliminarUsuario, editarUsuario }