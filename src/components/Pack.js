import React from 'react';
import { useRef, useState} from 'react';
import CatagoryList from './CatagoryList';
import PackChart from './PackChart';

import { RiSave3Fill, RiDeleteBin6Line} from "react-icons/ri";
import { IconContext } from 'react-icons/lib';

const Pack = (props) => {

    const editCatagoryName = useRef('')

    const [syncModules, setSyncModules] = useState(1); // state is only to sync chart refresh

    const updateCatagory = async e => {
            e.preventDefault();
            let id = e.target.target;
            try{
                const response = await fetch(`https://my-pack-api.herokuapp.com/packs/${props.packId}/catagories/${id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: e.target[0].value
                    })
                })
                const data = await response.json()
                props.setState(data);
                }catch(error){
                    console.error(error)
                }
            }
            
        const deleteCatagory = async e => {
            e.preventDefault();
                try{
                    const response = await fetch(`https://my-pack-api.herokuapp.com/packs/${props.packId}/catagories/${e.target.value}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                    const data = await response.json()
                    props.setState(data);
                    }catch(error){
                        console.error(error)
                    }
                }
        // instead of trying to calc the base weight in the chart doing it here and passing as props
        // better for pack reload
        
        

    return(
        <div className="pack">
            <div className="chart-container">
                <h2>{props.name}</h2>
                <PackChart packId={props.packId} sync={syncModules}/>
            </div>
            <div className='catagories-container'>
   {props.catagories? props.catagories.map((catagory)=>{
                return(
                    <div className={`${catagory.name}-container, catagory-container`} key={`${catagory.id}${catagory.name}`}>

                        <form className="catagory-name" onSubmit={updateCatagory} target={catagory.id}>
                            <input ref={editCatagoryName} defaultValue={catagory.name} type="text"></input>
                            <IconContext.Provider value={{color: "white", className:"save-icon" }}>
                                <button className="edit-button" onClick='submit'><RiSave3Fill/></button>
                            <button className="delete-button" onClick={deleteCatagory} value={catagory.id}><RiDeleteBin6Line/></button>
                            </IconContext.Provider>
                        </form>
                    
                        <CatagoryList items={catagory.items}
                                        id={catagory.id}
                                        packId={props.packId}
                                        activepack={props.activepack}
                                        update={props.setState}
                                        sync={syncModules}
                                        setSync={setSyncModules}
                                        />
                        
                    </div>
                        )
            }):""}
            </div>
            
        </div>
    )
}
export default Pack