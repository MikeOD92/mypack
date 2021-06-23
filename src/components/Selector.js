import React from 'react';
import{ useEffect, useState, useRef} from 'react';
import Pack from './Pack';


const Selector = () => {

    const [packList, setPackList] = useState([]);
    const [thisPack, setThisPack] = useState(null);
    const [activePack, setActivePack] = useState({});

    const selectedPack = useRef(null);
    const packName = useRef(null);
//// get pack list
    useEffect(()=>{
        ( async ()=>{
            try{
                const response = await fetch('https://my-pack-api.herokuapp.com/packs/');
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
    if(thisPack !== null){
        ( async ()=>{
            try{
                const packResponse = await fetch(`https://my-pack-api.herokuapp.com/packs/${thisPack}/`);
                const data = await packResponse.json();
                setActivePack(data)
            }catch(err){
                console.error(err)
            }
        })()
    }else{
        console.log('thispack is undefined')
    } 
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
            const response = await fetch('https://my-pack-api.herokuapp.com/packs/', {
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
            const response = await fetch(`https://my-pack-api.herokuapp.com/packs/${activePack.id}/catagories/`, {
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
/////////// Delete a pack
        const deletePack = async e => {
            e.preventDefault();
            try{
                const response = await fetch(`https://my-pack-api.herokuapp.com/packs/${thisPack}/`, {
                    method: 'DELETE'
                })
                const data = await response.json()
                setPackList(data);
                setActivePack(0)
                }catch(error){
                    console.error(error)
                }
        }
    return(
        <div className="pack-choice">
            <div className="header-bar">
                  {/* ///////////////DROP DOWN/////////////////// */}
            <form onSubmit={viewPack}>
            <select ref={selectedPack}>
            {packList.map(item => {
                return(
                <option key={`${item.id}${item.name}`} value={item.id}> {item.name} </option>
            )
            })}
            </select>
                <input type='submit' value="view pack" />
            </form>
            {/* ///////////New Pack from///////////// */}
            <div className='newpack-module'>
                <form onSubmit={createPack}>
                    <input ref={packName} type="string" required={true}/>
                    <input type='submit' value='create pack' />
                </form>
            </div>

            <h1> my~pack</h1>
      
            </div> 
             {/* ////////// View pack component//////////// */}
                {activePack.id? <Pack 
                                    packId={thisPack}
                                    name={activePack.name}
                                    catagories={activePack.catagories}
                                    activePack={activePack}
                                    setState={setActivePack}/> : ""}
                                    
                {activePack.id? 
                    <div className='new-catagory'>
                        <form  onSubmit={newCatagory}>
                            <input type='text' ref={catName}/> 
                            <input type='submit' value='add catagory'/>
                        </form>
                    </div> : ''}
                {activePack.id?
                    <div className='deletePack'>
                        <label>Delete Pack</label>
                        <button onClick={deletePack}/>
                    </div> : ''}
            </div>
        )
    }
export default Selector;