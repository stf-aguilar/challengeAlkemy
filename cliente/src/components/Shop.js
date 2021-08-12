import { useState, useEffect } from 'react'
import './App.css';

function Shop() { 
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchItems()
    },[])

    const fetchItems = async () => {
        const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
        const items = await data.json()
        console.log("name",items.results[0].name)
        setItems(items.results)
    }

  return (
    <div>
       {items.map((item) =>{
           <h2>{item.name}</h2>
       })}
    </div>
  );
}

export default Shop;