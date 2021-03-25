import './App.css';
import React from 'react';
import{ useEffect, useState} from 'react';
import Chart from './components/PackChart';

function App() {
  const [pack, setpack] = useState({});

  useEffect(()=>{
    ( async ()=>{
      try{
        const response = await fetch('http://localhost:3001/packs/3');
        const data = await response.json();
        setpack(data)
      }catch(err){
        console.error(err)
      }

    })()
  },[]
  )
  
  
  return (
    <div className="App">
        <h1> {pack.name} </h1>
        {/* <Chart/> */}
        {pack.catagories? pack.catagories.map(catagory => {
          return(
            <div className='catagory-container'>
              <h2>{catagory.name}</h2>
              <ul>{catagory.items.map(item => {
                return(
                  <li> {item.name} :: {item.weight}oz</li>
                )
              })}
              </ul>
              <h4>Total: {catagory.items.reduce(function(result, index){
                return result + index.weight;
              }, 0)
              }.oz</h4>
            </div>
          )
        }): ''}

    </div>
  );
}

export default App;
