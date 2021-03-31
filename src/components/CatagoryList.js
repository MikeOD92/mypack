import React from 'react';
import {useRef, useState} from 'react';


const CatagoryList = (props) =>{
    const name = useRef('');
    const descript = useRef('');
    const weight = useRef(0);

    const [catagoryState, setCatagoryState] = useState(props.items)
    
    const newItem =  async e =>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3001/packs/${props.packId}/catagories/${e.target.id}/items`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.current.value,
                    dis: descript.current.value,
                    weight: weight.current.value,
                    catagory: e.target.id,
                })
            })
            const data = await response.json();
            setCatagoryState(data);
        }catch(error){
            console.error(error)
        }finally{
            name.current.value = ""
            descript.current.value = ""
            weight.current.value = ""
        }
    }
    return(
        <div>
        <ul>
            {catagoryState.map(item => {
                return(
                    <li key={`${item.id}${item.name}`}> {item.name} :: {item.weight}.oz </li>
                )
            })}
        </ul>
        <form onSubmit={newItem} id={props.id}>
            <label> Name </label><input type="text" ref={name}/>
            <label> description </label><input type="text" ref={descript}/>
            <label> weight</label><input type="float" ref={weight}/> 
            <input type="submit" value="add item"/>
        </form>
        </div>
    )
}

export default CatagoryList;