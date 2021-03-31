import { render } from '@testing-library/react';
import React from 'react';
import{ useEffect, useState, useRef} from 'react';
import Pack from './Pack';

const CatagoryComponent = (props) => {

    const [catagory, setCatagory] = useState({});

    useEffect(()=>{
        (async ()=> {
            try{
                const response = await fetch(`http://localhost:3001/packs/${props.packId}/catagories/${props.info}`);
                const data = await response.json();
                setCatagory(data);
            }catch(err){
                console.error(err)
            }
        })()
    },[catagory])

    const name = useRef(null);
    const descript = useRef(null);
    const weight = useRef(null);

    const newItem =  async e =>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3001/packs/${props.packId}/catagories/${props.info}/items`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.current.value,
                    dis: descript.current.value,
                    weight: weight.current.value,
                    catagory: props.info,
                })
            })
            const data = await response.json();
            setCatagory(...catagory, data);
        }catch(error){
            console.error(error)
        }finally{
            name.current.value = ""
            descript.current.value = ""
            weight.current.value = ""
        }
    }

        return(
        <div className='catagory-container'>
            <h3> {catagory.name}</h3>
        { catagory.items? <ul>
            {catagory.items.map((item)=>{
            return(
                <li>{item.name} : {item.dis} : {item.weight}oz </li>
            )})}
        </ul>:''}
        <form onSubmit={newItem}>
            <label> Name </label><input type="text" ref={name}/>
            <label> description </label><input type="text" ref={descript}/>
            <label> weight oz </label><input type="float" ref={weight}/> 
            <input type="submit" value="add item"/>
        </form>
        </div>)
    }        



export default CatagoryComponent