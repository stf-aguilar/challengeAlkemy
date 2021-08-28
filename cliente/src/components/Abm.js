import '../App.css'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Table, Form, FormLabel, FormControl, FormSelect} from 'react-bootstrap';


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
      getOperaciones()
    }) 
  }

  useEffect(() => {
   getOperaciones()
  }, []) 

const getOperaciones = () => {
    Axios.get('http://localhost:3001/operaciones').then((response)=> {
      setOperacionesLista(response.data)
    }) 
  }

  return (
    <div>
     <div className="contenedor">
      <div className="contenido">
        <h4>Ingresos</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Concepto</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {operacionesLista.map((val, key)=> {
              const tipo = val.tipo
              
              if(tipo == 'Ingreso'){
                return(
                  <tr key={key}>
                    <td>{val.id}</td>
                    <td>{val.concepto}</td>
                    <td>${val.monto}</td>
                    <td>{val.fecha}</td>
                    <td>{val.tipo}</td>
                  </tr>
                )
              }
            })}    
          </tbody>
        </Table>
        <h4>Egresos</h4>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Concepto</th>
              <th>Monto</th>
              <th>Fecha</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {operacionesLista.map((val, key)=> {
              const tipo = val.tipo
            
              if(tipo == 'Egreso'){
                console.log('entró al if')
              return(
                <tr key={key}>
                  <td>{val.id}</td>
                  <td>{val.concepto}</td>
                  <td>${val.monto}</td>
                  <td>{val.fecha}</td>
                  <td>{val.tipo}</td>
                </tr>
                )
              }
            })}
          </tbody>
        </Table>
      </div>
      <div className="information">
        <h3>Formulario</h3>
          <Form.Label>Concepto:</Form.Label>
          <Form.Control 
                  type="text"
                  onChange={(e) => {
                    setConcepto(e.target.value)
                  }}
          />
          <Form.Label>Monto:</Form.Label>
          <Form.Control
                  type="number"
                  onChange={(e) => {
                    setMonto(e.target.value)
                  }}
          />
          <Form.Label>Fecha:</Form.Label>
          <Form.Control 
                  type="date"
                  onChange={(e) => {
                    setFecha(e.target.value)
                  }}
          />
          <Form.Label>Tipo:</Form.Label>
          <Form.Select className="me-sm-2" id="inlineFormCustomSelect"
                  id="tipo"
                  onChange={(e) => {
                    setTipo(e.target.value)
                  }}
          >
            <option>Seleccionar</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </Form.Select>
          <button onClick={agregarOperacion}>Agregar operación</button>
      </div>
     </div>  
    </div>
  );
}

export default Abm;