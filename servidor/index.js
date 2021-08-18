const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'1234',
    database:'presupuestoSistema'
})

app.post('/create', (req, res) => {
    const concepto = req.body.name
    console.log(concepto)
    const monto = req.body.monto
    const fecha = req.body.fecha
    const tipo = req.body.tipo

    db.query(
        'INSERT INTO operaciones (concepto, monto, fecha, tipo) VALUES (?,?,?,?)',
        [concepto, monto, fecha, tipo],
        (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send('Values inserted')
            }
        }
    )
})

app.listen(3001, () => {
    console.log('server running on port 3001')
})