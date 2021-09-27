import Axios from 'axios'

export default function getOperaciones(){
    return Axios.get('http://localhost:8080/api/operaciones')
        .then((response)=> {
        const {data = []} = response
        console.log(data)
        return data
    }) 
  }


  /*

const getOperaciones = () => {
    Axios.get('http://localhost:8080/api/operaciones').then(
      (response)=> {
        setOperacionesLista(response.data)
    }) 
  }



  */