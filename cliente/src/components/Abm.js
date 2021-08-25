import '../App.css'
import { useState } from 'react'
import Axios from 'axios'
import { Table } from 'react-bootstrap';

function Abm() {
  const [concepto, setConcepto] = useState('')
  const [monto, setMonto] = useState(0)
  const [fecha, setFecha] = useState('')
  const [tipo, setTipo] = useState('')
  const [operacionesLista, setOperacionesLista] = useState([])

  const agregarOperacion = () => {
    Axios.post('http://localhost:3001/create', {
      concepto:concepto,
      monto:monto,
      fecha:fecha,
      tipo:tipo
    }).then(()=> {
      console.log('success')
    }) 
  }

  const getOperaciones = () => {
    Axios.get('http://localhost:3001/operaciones').then((response)=> {
      setOperacionesLista(response.data)
    }) 
  }


  return (
    <div>
     <h1>Abm Page</h1>
     <div className="contenedor">
      <div className="contenido contenido-izq">
        <h3>Lista de operaciones</h3>
        <button onClick={getOperaciones}>Mostrar</button>
        <Table striped bordered hover size="sm">

        </Table>
        {operacionesLista.map((val, key)=> {
          return(
            <div key={key}>{val.concepto}</div>
          )
        })}
      </div>
      <div className="information contenido-der">
        <h3>Formulario</h3>
  
        <label>Concepto:</label>
        <input  type="text"
                onChange={(e) => {
                  setConcepto(e.target.value)
                }}
        />
        <label>Monto:</label>
        <input type="number"
           onChange={(e) => {
            setMonto(e.target.value)
          }}
        />
        <label>Fecha:</label>
        <input type="date"
             onChange={(e) => {
              setFecha(e.target.value)
            }}
        />
        <label>Tipo:</label>
        <select id="tipo"
           onChange={(e) => {
            setTipo(e.target.value)
          }}
        >
          <option>Seleccionar</option>
          <option>Ingreso</option>
          <option>Egreso</option>
        </select>
        <button onClick={agregarOperacion}>Agregar operación</button>
      </div>
     </div>

   
    </div>
  );
}

export default Abm;