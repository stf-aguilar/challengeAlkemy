const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

//middlewares
app.use(cors())
app.use(express.json())


const db = mysql.createConnection({
    user:'root',
    host:'localhost',
    password:'1234',
    database:'presupuestoSistema'
})

//routes
app.post('/create', (req, res) => {
    const concepto = req.body.concepto
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

app.get('/operaciones', (req, res) => {
    db.query(
        'SELECT *, date_format(fecha, "%d-%m-%Y") AS fecha FROM operaciones',
        (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        }
    )
})

app.put('/update', (req, res) => {
    const id = req.body.id
    console.log(id)
    const monto = req.body.monto
    console.log(monto)
    const concepto = req.body.concepto
    console.log(concepto)
    const fecha = req.body.fecha
    const fechaSql = fecha.split(/[-/]/).reverse().join("-");
    console.log(fecha)
    console.log(fechaSql)
   /* str_to_date(req.body.fecha, '%m-%d-%Y') */
    
    
    db.query(
        'UPDATE operaciones SET concepto = ?, monto = ?, fecha = ? WHERE id = ?',
        [concepto, monto, fecha, id],
        (err, result) => {
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        }
    )
})

//settings
app.set('port', process.env.PORT || 3010)

//starting the server
app.listen(app.get('port'), () => {
    console.log('server running on port 3010')
})

