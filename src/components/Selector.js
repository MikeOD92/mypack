import React from 'react';
import{ useEffect, useState, useRef} from 'react';
import Pack from './Pack';


const Selector = () => {

    const [packList, setPackList] = useState([]);
    const [thisPack, setThisPack] = useState({});

    const activePack = useRef(null);
    const packName = useRef(null);

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
        setThisPack(activePack.current.value);
    }

    const createPack = async e =>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:3001/packs/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: packName.current.value
                })
            })
            const data = await response.json();
            setPackList([...packList, data]);
        }catch(error){
            console.error(error)
        }finally{
            packName.current.value = '';
        }
    }

    
    return(
        <div className="pack-choice">
                  {/* ///////////////DROP DOWN/////////////////// */}
        <form onSubmit={viewPack}>
        <label> Pack </label> <select ref={activePack}>
        {packList.map(item => {
            return(
            <option key={`${item.id}${item.name}`} value={item.id}> {item.name} </option>
        )
        })}
        </select>
            <input type='submit' value="view pack"/>
        </form>
        {/* ///////////New Pack from///////////// */}
        <div className='newpack-module'>
            <form onSubmit={createPack}>
                Pack Name: <input ref={packName} type="string"/>
                <input type='submit' value='create pack'/>
            </form>
        </div>
        {/* ////////// View pack component//////////// */}
            {thisPack[0]? <Pack packId={thisPack}/> : ""}
        </div>
    )
}
export default Selector;