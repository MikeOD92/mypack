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
            const response = await fetch(`http://localhost:3001/packs/${props.packId}/catagories/${props.id}/items`, {
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

    const editItem = async e =>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3001/packs/${props.packId}/catagories/${props.id}/items/${e.target.target}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: e.target[0].value,
                    des: e.target[1].value,
                    weight: e.target[2].value
                })
            })
            const data = await response.json()
            setCatagoryState(data);
            }catch(error){
                console.error(error)
            }
        }
    const removeItem = async e =>{
            e.preventDefault();
                try{
                    const response = await fetch(`http://localhost:3001/packs/${props.packId}/catagories/${props.id}/items/${e.target.id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    const data = await response.json()
                    setCatagoryState(data);
                    }catch(error){
                        console.error(error)
                    }
                }
    let acc = 0;

    const weights = () =>{
        catagoryState.forEach(element => {
            acc = element.weight + acc
            return acc
        });
    }
    weights();

    return(
        <div>
            {catagoryState.map(item => {
                    return(
                        <div>
                            <form target={item.id} onSubmit={editItem}  > 
                                <input type='text' defaultValue={item.name} required={true}/>
                                <input type='text' defaultValue={item.des} required={true}/>
                                <input type='float' defaultValue={item.weight} required={true}/>
                                <button onClick={removeItem} id={item.id}>x</button> 
                                <input type='submit' value="edit"/>
                            </form> 
                        </div>
                )}
                
            )}
            <p> total: {acc.toFixed(2)}oz </p>
            <br/>
            <div className='new-item'>
                <form onSubmit={newItem} id={props.id}>
                    <input type="text" ref={name} defaultValue='name' required={true}/>
                    <input type="text" ref={descript} defaultValue='description'required={true}/>
                    <input type="float" ref={weight} defaultValue='weight'required={true} /> 
                    <input type="submit" value="+"/>
                </form>
            </div>
        </div>
    )
}

export default CatagoryList;