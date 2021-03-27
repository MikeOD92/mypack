import React from 'react';
import{ useEffect, useState, useRef} from 'react';
import Pack from './Pack';

const PickAPack = () => {

    const [packList, setPackList] = useState([]);
    const [packstate, setPackState] = useState('');
    const activePack = useRef(null);
    useEffect(()=>{
        ( async ()=>{
            try{
                const response = await fetch('http://localhost:3001/packs/');
                const data = await response.json();
                setPackList(data)
            }catch(err){
                console.error(err)
            }
        })()
    },[]
    )
    const viewPack = (e) => {
        e.preventDefault();
        setPackState([...activePack.current.value]);
    }
    // const printTest = () =>{
    //     console.log(activePack.current.value)
    // }
    return(
        <div className="pack-choice">
                  {/* ///////////////DROP DOWN/////////////////// */}
        <form onSubmit={viewPack}>
        <label> Pack </label> <select ref={activePack}>
        {packList.map(item => {
            return(
            <option key={item.id} value={item.id}> {item.name} </option>
        )
        })}
        </select>
            <input type='submit' value="view pack"/>
        </form>

            {activePack.current? <Pack packId={packstate}/> : ""}
        </div>
    )
}
export default PickAPack;