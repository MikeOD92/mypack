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
                const response = await fetch(`http://localhost:3001/packs/${props.packId}/catagories/${id}`, {
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
                    const response = await fetch(`http://localhost:3001/packs/${props.packId}/catagories/${e.target.value}`, {
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
        
        let baseWeight = 0;

        const getBaseWeight = (props) => {
            let items = [];

            props.catagories.forEach(catagory => {
                items.push(...catagory.items)
            });

            items.forEach( item => {
                baseWeight = item.weight + baseWeight;
            })
        
            return baseWeight
        }
        
        getBaseWeight(props);

    return(
        <div className="pack">
            <div className="chart-container">
                <h1>{props.name}</h1>
                <PackChart packId={props.packId}/>
                <p> Base weight: {(baseWeight/16).toFixed(2)} lbs or {baseWeight.toFixed(2)}oz</p>
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