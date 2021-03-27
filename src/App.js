import './App.css';
import React from 'react';
//import{ useEffect, useState, useRef} from 'react';
// import Chart from './components/PackChart';
import PickAPack from './components/PickAPack';

function App() {
 
  // const [pack, setpack] = useState({});
  // const activePack = useRef(null);


  // useEffect(()=>{
  //   const parsePackID = activePack.current.value.key
  //   ( async ()=>{
  //     try{
  //       const response = await fetch(`http://localhost:3001/packs${parsePackID}`);
  //       const data = await response.json();
  //       setPackList(data)
  //     }catch(err){
  //       console.error(err)
  //     }

  //   })()
  // },[activePack]
  // )
  
  return (
    <div className="App">
      <PickAPack/>
      {/* //////////////////// */}

      

        {/* <Chart/> */}

        {/* {pack.catagories? pack.catagories.map(catagory => {
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
        }): ''}  */}

    </div>
  );
}

export default App;
