import React from 'react';
import {useState} from 'react';
import { RiRefreshLine, RiSave3Fill, RiSave3Line } from "react-icons/ri";
import { IconContext } from 'react-icons/lib';

const CatagoryList = (props) =>{



    const [catagoryState, setCatagoryState] = useState(props.items)
    
    const newItem =  async e =>{
        e.preventDefault();
        try{
            const response = await fetch(`https://my-pack-api.herokuapp.com/packs/${props.packId}/catagories/${props.id}/items`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: 'name', 
                    des: 'description',
                    weight: 0.0,
                    catagory: e.target.id,
                })
            })
            const data = await response.json();
            setCatagoryState(data);
            props.setSync(props.sync + 1);
        }catch(error){
            console.error(error)
        }
    }

    const editItem = async e =>{
        e.preventDefault();
        try{
            const response = await fetch(`https://my-pack-api.herokuapp.com/packs/${props.packId}/catagories/${props.id}/items/${e.target.target}`, {
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
            props.setSync(props.sync + 1)
            }catch(error){
                console.error(error)
            }
        }
    const removeItem = async e =>{
            e.preventDefault();
                try{
                    const response = await fetch(`https://my-pack-api.herokuapp.com/packs/${props.packId}/catagories/${props.id}/items/${e.target.id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    const data = await response.json()
                    setCatagoryState(data);
                    props.setSync(props.sync + 1);
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
                        <div className="line-item">
                            <form target={item.id} onSubmit={editItem}  > 
                                <input type='text' defaultValue={item.name} required={true}/>
                                <input type='text' defaultValue={item.des} required={true}/>
                                <input type='float' defaultValue={item.weight} required={true} className="weight"/>
                                <IconContext.Provider value={{color: "white", className:"save-icon" }}>
                                <button className="edit-button" onClick='submit'><RiSave3Fill/></button>
                                </IconContext.Provider>
                                <button  className="delete-button" onClick={removeItem} id={item.id}>x</button> 
                            </form> 
                        </div>
                )}
                
            )}
            <button className='new-item'onClick={newItem}>+</button>
            <p> Total: {acc.toFixed(2)}oz </p>
           
        </div>
    )
}

export default CatagoryList;