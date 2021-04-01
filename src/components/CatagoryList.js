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
                    des: descript.current.value,
                    weight: weight.current.value,
                    catagory: e.target.id,
                })
            })
            const data = await response.json();
            setCatagoryState(data);
        }catch(error){
            console.error(error)
        }finally{
            name.current.value = "name"
            descript.current.value = "description"
            weight.current.value = "weight"
        }
    }
    let editable = '';

    const editItem = (e) =>{
        e.preventDefault();
        return editable = e.target.id
        
    }
    const removeItem = (e) =>{
        e.preventDefault()
        console.log(editable)
    }
    return(
        <div>
        <ul>
            {catagoryState.map(item => {
                    return(
                    <li key={`${item.id}`}> {item.name} : {item.des} : {item.weight}.oz <button onClick={editItem} id={item.id}>edit</button> <button onClick={removeItem}>X</button></li>
                )}
                
            )}
        </ul>
        <form onSubmit={newItem} id={props.id}>
            <input type="text" ref={name} defaultValue='name'/>
            <input type="text" ref={descript} defaultValue='description'/>
            <input type="float" ref={weight} defaultValue='weight' /> 
            <input type="submit" value="add item"/>
        </form>
        </div>
    )
}

export default CatagoryList;