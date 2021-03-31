import React from 'react';
import{ useEffect, useState, useRef} from 'react';
import Pack from './Pack';


const Selector = () => {

    const [packList, setPackList] = useState([]);
    const [thisPack, setThisPack] = useState({});
    const [activePack, setActivePack] = useState({});

    const selectedPack = useRef(null);
    const packName = useRef(null);
//// get pack list
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
//// selected and fetch active pack info
    useEffect(()=>{
        ( async ()=>{
            try{
                const packResponse = await fetch(`http://localhost:3001/packs/${thisPack}`);
                const data = await packResponse.json();
                setActivePack(data)
            }catch(err){
                console.error(err)
            }
        })()
    },[thisPack]
    )

    const viewPack = (e) => {
        e.preventDefault();
        setThisPack(selectedPack.current.value);
    }
//////////// create a pack
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
///////////// create a catagory

    const catName = useRef(null);

    const newCatagory = async e =>{
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:3001/packs/${activePack.id}/catagories/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: catName.current.value
                })
            })
            const data = await response.json()
            setActivePack(data);
            }catch(error){
                console.error(error)
            }finally{
                catName.current.value = ''
            }
        }

    return(
        <div className="pack-choice">
                  {/* ///////////////DROP DOWN/////////////////// */}
        <form onSubmit={viewPack}>
        <label> Pack </label> <select ref={selectedPack}>
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

            {activePack.id? <Pack 
                                packId={thisPack}
                                name={activePack.name}
                                catagories={activePack.catagories}
                                activePack={activePack}
                                setState={setActivePack}/> : ""}
                                
            {activePack? <form onSubmit={newCatagory}>
                <input type='text' ref={catName}/> 
                <input type='submit' value='add catagory'/>
            </form> : ''}
        </div>
    )
}
export default Selector;