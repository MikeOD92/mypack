import React from 'react';
import { useRef} from 'react';
import CatagoryList from './CatagoryList';
import PackChart from './PackChart';

const Pack = (props) => {

    const editCatagoryName = useRef('')

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
                <h1>{props.name}</h1>
                <PackChart packId={props.packId}/>
            </div>
            <div className='catagories-container'>
   {props.catagories? props.catagories.map((catagory)=>{
                return(
                    <div className={`${catagory.name}-container, catagory-container`} key={`${catagory.id}${catagory.name}`}>

                        <form className="catagory-name" onSubmit={updateCatagory} target={catagory.id}>
                            <input ref={editCatagoryName} defaultValue={catagory.name} type="text"></input>
                            <input type="submit" value="update"/>
                            <button onClick={deleteCatagory} value={catagory.id}>X</button>
                        </form>
                    
                        <CatagoryList items={catagory.items}
                                        id={catagory.id}
                                        packId={props.packId}
                                        activepack={props.activepack}
                                        update={props.setState}
                                        />
                        
                    </div>
                        )
            }):""}
            </div>
            
        </div>
    )
}
export default Pack