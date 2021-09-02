import Axios from 'axios'

export const getOperaciones = async () => {
    const respuesta = await Axios.get('http://localhost:3001/operaciones').then((response)=> {
        console.log('desde getOperaciones',response.data)
    }) 
    return respuesta.data
  }

