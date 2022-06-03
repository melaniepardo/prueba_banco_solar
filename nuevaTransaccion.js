const { pool } = require("./config");
// MODIFICA USUARIOS Y tabla transacciones
const nuevaTransaccion = async (cliente) => {
    console.log(cliente)
    const emisor = {
        text: 'UPDATE usuarios SET balance = balance - $1 WHERE id = $2',
        values: [cliente[2], cliente[0]]
    }
    const receptor = {
        text: 'UPDATE usuarios SET balance = balance + $1 WHERE id = $2',
        values: [cliente[2], cliente[1]]
    }
    // const guardarTransferencia = async (transferencia) => {
    //     const fecha = new Date()//instancia un nuevo objeto fecha sin un formato especifico, sólo la del momento
    //     const [emisor, receptor, monto] = Object.values(transferencia)//destructuring a los 3 valores

    const guardarTransferencia = {
        // rowMode: "array",
        // name: 'sql-user', // prepared statement
        text: "INSERT INTO transferencias (emisor, receptor, monto, fecha ) VALUES ($1,$2,$3,now())",
        values: cliente
    }

    try {
        await pool.query('BEGIN')
        await pool.query(emisor)
        const result = await pool.query(guardarTransferencia)
        await pool.query(receptor)
        console.log('Operación realizada con éxito')
        await pool.query('COMMIT')
        console.log('Operación registrada con éxito')
        return result.rows[0]
    } catch (error) {
        await pool.query('ROLLBACK')
        console.error(error)
    }
}
module.exports = { nuevaTransaccion }