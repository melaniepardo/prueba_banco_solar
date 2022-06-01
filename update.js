const nuevaTransaccion = async (cliente) => {
    const emisor = {
        text: 'UPDATE usuarios SET balance = saldo - $1 WHERE id = $2',
        values: [nombre, id]
    }
    const receptor = {
        text: 'UPDATE usuarios SET balance = saldo + $1 WHERE id = $2',
        values: [nombre, id]
    }
    const registrar = {
        text: 'INSERT INTO transacciones (id, emisor, receptor, monto, fecha) VALUES ($2, $3, $4, $5) RETURNING *',
        values: [id, emisor, receptor, monto, fecha]
    }
    try {
        await cliente.query('BEGIN')
        await cliente.query(emisor)
        await cliente.query(receptor)
        console.log('Operación realizada con éxito')
        const results = await cliente.query(registrar)
        await cliente.query('COMMIT')
        console.log('Operación registrada con éxito')
        return results
    } catch (error) {
        console.log(results)
        await cliente.query('ROLLBACK')
        console.error(error)
    }
}
