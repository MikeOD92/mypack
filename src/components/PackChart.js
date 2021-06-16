import React from 'react';
import {Chart, Doughnut} from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons/lib';

const PackChart = (props) => {
    
    const [baseWeight, setBaseWeight] = useState(0); 

    ///////// use effect to generate chart. 
    const [chartData, setChart]= useState(null);

    useEffect(()=>{ 
        const makeCall = async () => {
            try{
                const res = await fetch(`https://my-pack-api.herokuapp.com/packs/${props.packId}`)
                const data = await res.json();
                const formattedData = prepData(data);
                getBaseWeight(data);
                setChart(formattedData);
        } catch(err){
                console.error(err)
            } 
        }
        makeCall();
    },[props]);

    // prep data for chart

    const prepData = (data) => {
        const ChartData = {
            labels: [],
            datasets: [
                {label:'', data: [], backgroundColor:[ '#D6E3F8','#FFF07C', '#724E91', '#FE5E41', '#6BA292' , 'black', '#D6E3F8','#FFF07C', '#724E91', '#FE5E41', '#6BA292' , 'black', '#D6E3F8','#FFF07C', '#724E91', '#FE5E41', '#6BA292' , 'black'], borderColor:'rgba(0,0,0,0)', drawBorder:false}
            ]
        }
        
        data.catagories.forEach(catagory => {

            ChartData.labels.push(catagory.name)
            
            let catWeight = 0;
            catagory.items.map(item => {
                catWeight = item.weight + catWeight
                return catWeight
            })

            ChartData.datasets[0].data.push(catWeight)
        })
        
        return ChartData
    }

    ////////////////////////////////base Weight 

        const getBaseWeight = (data) => {
            let items = [];
            let weight = 0;
            data.catagories.forEach(catagory => {
                items.push(...catagory.items)
            });

            items.forEach( item => {
                weight = item.weight + weight;
            })
            return setBaseWeight(weight)
        }

    // function to create chart in use effect. 

    const createChart = () => {

        return(
            <Doughnut 
                data={chartData} 
                width={350}
                height={350}
                options={{ maintainAspectRatio: false}}
            />
        )
        // const ctx = document.querySelector('#packChart').getContext('2d');

        // if(window.packChart !== undefined){
        //     window.packChart.destroy();
        //     window.packChart = new Chart(ctx, {
        //         type:'doughnut',
        //         data: data, 
        //         options: {
        //             legend:{
        //                 display: false
        //             }
        //         }
        //     })
        // }

        // let packChart = new Chart(ctx, {
        //     type:'doughnut',
        //     data: data, 
        //     options: {
        //         legend:{
        //             display: false
        //         }
        //     }
        // })
    }

    return (
        <>
        <div>
            {/* <canvas id='packChart'></canvas> */}
            {createChart()}
        </div>
        
        <br/>
        <IconContext.Provider value={{color: "black", className: "refresh-icon"}}>
        <p> Base weight: {(baseWeight/16).toFixed(2)} lbs / {baseWeight.toFixed(2)}oz</p>
        {/* <button className="reset-button"onClick={reset}><RiRefreshLine/></button> */}
        </IconContext.Provider>
        </>
    )
}
export default PackChart