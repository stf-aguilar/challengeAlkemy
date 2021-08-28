import Axios from 'axios'

function getOperaciones(){
    Axios.get('http://localhost:3001/operaciones').then((response)=> {
        console.log('desde getOperaciones',response.data)
      return (response.data)
    }) 
  }

  export default getOperaciones