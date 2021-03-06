import '../App.css'
import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Table, Form, FormLabel, FormControl, FormSelect, Button} from 'react-bootstrap';
//const getOperaciones = require('../helpers/getOperaciones')

function Abm() {
  const [concepto, setConcepto] = useState('')
  const [monto, setMonto] = useState(0)
  const [fecha, setFecha] = useState('')
  const [tipo, setTipo] = useState('')
  
  const [operacionesLista, setOperacionesLista] = useState([])
  
  const [newMonto, setNewMonto] = useState(0)
  const [newConcepto, setNewConcepto] = useState('')
  const [newFecha, setNewFecha] = useState('')


  const agregarOperacion = () => {
    Axios.post('http://localhost:8080/api/operaciones', {
      concepto:concepto,
      monto:monto,
      fecha:fecha,
      tipo:tipo
    }).then(()=> {
      setOperacionesLista([
        ...operacionesLista,
        {
          concepto:concepto,
          monto:monto,
          fecha:fecha,
          tipo:tipo
        }
      ])
    }) 
  }
  

  useEffect(() => {
   getOperaciones()
  }, []) 

  
const getOperaciones = () => {
    Axios.get('http://localhost:8080/api/operaciones').then(
      (response)=> {
        setOperacionesLista(response.data)
    }) 
  }

  

const updateOperacion = (id) => {
  Axios.put('http://localhost:8080/api/operaciones/update', {
    id:id,
    concepto:(!newConcepto) ? operacionesLista[id].concepto:newConcepto,
    monto:(!newMonto) ? operacionesLista[id].monto:newMonto,
    fecha:(!newFecha) ? operacionesLista[id].fecha:newFecha,
    tipo:tipo
  }).then(
    (response)=>{
      setOperacionesLista(
        operacionesLista.map((val) =>{
          return val.id == id
          ? {
            id:val.id,
            concepto:(!newConcepto) ? val.concepto:newConcepto,
            monto:(!newMonto) ? val.monto:newMonto,
            fecha:(!newFecha) ? val.fecha:newFecha,
            tipo:val.tipo
          }
          : val;
        })
      )
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
      alert('update')
  })
} 

const deleteOperacion = (id) => {
  Axios.delete(`http://localhost:8080/api/operaciones/${id}`).then((response) => {
    setOperacionesLista(
      operacionesLista.filter((val) => {
        return val.id != id
    }))
    alert('delete')
  })
}
 
  return (
    <div>
     <div className="contenedor">
      <div className="contenido">
        <div className="titulo-operacion">        
          <h4>Ingresos</h4>
        </div>
        <div className="tabla-operaciones">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {operacionesLista.map((val, key)=> {
                const tipo = val.tipo
                
                if(tipo == 'Ingreso'){
                  return(
                    <tr key={key}>
                      <td>{val.concepto}
                        <input 
                          type="text" 
                          placeholder="Nuevo concepto"
                          onChange={(e) => {
                            setNewConcepto(e.target.value)
                          }}
                        />
                      </td>
                      <td>${val.monto}
                        <input 
                          type="number" 
                          placeholder="Nuevo monto"
                          onChange={(e) => {
                            setNewMonto(e.target.value)
                          }}
                        />
                      </td>
                      <td>{val.fecha}
                        <input 
                          type="date" 
                          onChange={(e) => {
                            setNewFecha(e.target.value)
                          }}
                        />
                      </td>
                      <td>{val.tipo}</td>
                      <td>
                        <Button 
                          variant="danger" 
                          className="boton" 
                          size="sm"
                          onClick={() => {deleteOperacion(val.id)}}
                        >
                          Delete
                        </Button>
                        <Button 
                          variant="primary" 
                          className="boton" 
                          size="sm" 
                          onClick={() => {updateOperacion(val.id)}}
                        >
                            Update
                        </Button>
                      </td>
                    </tr>
                  )
                }
              })}    
            </tbody>
          </Table>
        </div>{/* cierro div tabla ingresos*/}
        <div className="titulo-operacion">
          <h4>Egresos</h4>
        </div>
        <div className="tabla-operaciones">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {operacionesLista.map((val, key)=> {
                const tipo = val.tipo
              
                if(tipo == 'Egreso'){
                  console.log('entr?? al if')
                return(
                  <tr key={key}>
                    <td>{val.concepto}
                    <input 
                          type="text" 
                          placeholder="Nuevo concepto"
                          onChange={(e) => {
                            setNewConcepto(e.target.value)
                          }}
                        />
                    </td>
                    <td>${val.monto}
                    <input 
                          type="number" 
                          placeholder="Nuevo monto"
                          onChange={(e) => {
                            setNewMonto(e.target.value)
                          }}
                        />
                    </td>
                    <td>{val.fecha}
                      <input 
                          type="date" 
                          onChange={(e) => {
                            setNewFecha(e.target.value)
                          }}
                      />
                    </td>
                    <td>{val.tipo}</td>
                    <td>
                        <Button 
                          variant="danger" 
                          className="boton" 
                          size="sm"
                          onClick={() => deleteOperacion(val.id)}
                        >
                          Delete   
                        </Button>
                        <Button 
                          variant="primary" 
                          className="boton" 
                          size="sm" 
                          onClick={() => updateOperacion(val.id)}
                        >
                          Update
                        </Button>
                    </td>
                  </tr>
                  )
                }
              })}
            </tbody>
          </Table>
        </div>{/*cierro div tabla egresos */}
      </div>{/*cierro div contenido */}

      <div className="information">
        <div className="titulo-operacion">
          <h3>Formulario</h3>
        </div>
        <div className="formulario-operacion">          
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
          <select  
                  id="tipo"
                  onChange={(e) => {
                    setTipo(e.target.value)
                  }}
          >
              <option>Seleccionar</option>
              <option value="Ingreso">Ingreso</option>
              <option value="Egreso">Egreso</option>
          </select>
          <button onClick={agregarOperacion}>Agregar operaci??n</button>
        </div>          
      </div>
     </div>  
    </div>
  );
}

export default Abm;