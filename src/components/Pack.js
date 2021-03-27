import React from 'react';
import{ useEffect, useState} from 'react';

const Pack = (props) => {

    const [pack, setPack] = useState({});
    
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
    },[props.packId]
    )
    return(
        <div>
            {pack.name? <h1> {pack.name} </h1> : ''}
                {pack.catagories? pack.catagories.map(catagory => {
                    return(
                        <div className='catagory-container'>
                            <h2>{catagory.name}</h2>
                            <ul>{catagory.items.map(item => {
                                return(
                                    <li key={`${item.name}${item.id}${item.weight}`}> {item.name} :: {item.weight}oz</li>
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
    )
}
export default Pack;