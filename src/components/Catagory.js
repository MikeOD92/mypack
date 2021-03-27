import { render } from '@testing-library/react';
import React from 'react';
import{ useEffect, useState, useRef} from 'react';
import Pack from './Pack';

const CatagoryComponent = (props) => {

    const [reset ,setReset] = useState({});

    const name = useRef(null);
    const descript = useRef(null);
    const weight = useRef(null);

    const newItem =  async e =>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3001/items', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.current.value,
                    dis: descript.current.value,
                    weight: weight.current.value,
                    catagory: props.info.id,
                })
            })
            const data = await response.json();
            setReset(data);
        }catch(error){
            console.error(error)
        }
    }

        return(
        <div className='catagory-container'>
            <h3> {props.info.name}</h3>
        <ul>
           {props.info.items.map((item)=>{
               return(
                   <li>{item.name} : {item.dis} : {item.weight}oz </li>
               )})}
        </ul>
        <form onSubmit={newItem}>
            <label> Name </label><input type="text" ref={name}/>
            <label> description </label><input type="text" ref={descript}/>
            <label> weight oz </label><input type="float" ref={weight}/> 
            <input type="submit" value="add item"/>
        </form>
        </div>)
    }        



export default CatagoryComponent