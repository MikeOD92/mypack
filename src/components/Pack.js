import React from 'react';
import{ useEffect, useState, useRef} from 'react';
// import Chart from 'chart.js';
// import PackChart from './PackChart';
import CatagoryComponent from './Catagory'

const Pack = (props) => {

    const [currentPack, setPack] = useState({});
    
    const catName = useRef(null)
    
    useEffect(()=>{
            ( async ()=>{
            try{
                const response = await fetch(`http://localhost:3001/packs/${props.packId}`);
                const data = await response.json();
                setPack(data)

            }catch(err){
                console.error(err)
            }
            
        })()  
        }
    ,[props.packId]
    )
    // const catagories = [];
    // const weights = [];

    // const catsAndWeights = () => {
    //     currentPack.catagories.forEach(catagory => catagories.push(catagory.name)
    //     )
    //     currentPack.catagories.map(catagory => weights.push(catagory.items.reduce(function(result, index){
    //         return result + index.weight;
    //             }, 0)));
    //     console.log(catagories);
    //     console.log(weights);
    //     ///// probably going to need to calc the total weight and percentages to get the chart right 
    // }
    const newCatagory = async e =>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3001/packs/${props.packId}/catagories/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: catName.current.value
                })
            })
            const data = await response.json();
            setPack([...data]);
        }catch(error){
            console.error(error)
        }finally{
            catName.current.value = '';
        }
    }
    return(
        <div>
            {currentPack.name? <h1> {currentPack.name} </h1> : ''}

            {/* <PackChart cats={catagories} weight={weights}/> */}

            {currentPack.catagories? currentPack.catagories.map(catagory => {
                return (
                <CatagoryComponent packId={props.packId} info={catagory.id}/>
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