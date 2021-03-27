import React from 'react';
import{ useEffect, useState, useRef} from 'react';
// import Chart from 'chart.js';
// import PackChart from './PackChart';
import CatagoryComponent from './Catagory'

const Pack = (props) => {

    const [pack, setPack] = useState({});
    const catName = useRef(null)
    
    useEffect(()=>{
        ( async ()=>{
            try{
                const response = await fetch(`http://localhost:3001/packs/${props.packId}`);
                const data = await response.json();
                setPack(data)
                await catsAndWeights() 
                
            }catch(err){
                console.error(err)
            }
            
        })()
    },[props.packId]
    )
    const catagories = [];
    const weights = [];

    const catsAndWeights = () => {
        pack.catagories.forEach(catagory => catagories.push(catagory.name)
        )
        pack.catagories.map(catagory => weights.push(catagory.items.reduce(function(result, index){
            return result + index.weight;
                }, 0)));
        console.log(catagories);
        console.log(weights);
        ///// probably going to need to calc the total weight and percentages to get the chart right 
    }
    const newCatagory = async e =>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3001/catagories/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: catName.current.value
                })
            })
            const data = await response.json();
            // setPackList([...packList, data]);
        }catch(error){
            console.error(error)
        }finally{
            catName.current.value = '';
        }
    }
    return(
        <div>
            {pack.name? <h1> {pack.name} </h1> : ''}

            {/* <PackChart cats={catagories} weight={weights}/> */}

            {pack.catagories? pack.catagories.map(catagory => {
                return (
                <CatagoryComponent info={catagory}/>
                )
                }
                ): ''}

            <form onSubmit={newCatagory}>
                <input type='text' ref={catName}/> 
                <input type='submit' value='add catagory'/>
            </form>
        </div>
    )
}
export default Pack