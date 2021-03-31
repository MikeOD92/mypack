import React from 'react';

import CatagoryList from './CatagoryList';

const Pack = (props) => {


    return(
        <div>
            <h2>{props.name}</h2>

            {props.catagories? props.catagories.map((catagory)=>{
                return(
                    <div className={catagory.name} key={`${catagory.id}${catagory.name}`}>

                        <h3> {catagory.name}</h3>
                        <CatagoryList items={catagory.items}
                                        id={catagory.id}
                                        packId={props.packId}/>
                    </div>
                        )
            }):""}
            
        </div>
    )
}
export default Pack