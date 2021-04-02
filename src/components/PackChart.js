import React from 'react';
import Chart from 'chart.js';
import { useEffect } from 'react';

const PackChart = (props) => {

    useEffect(()=>{ 
        const makeCall = async () => {
            try{
                const res = await fetch(`http://localhost:3001/packs/${props.packId}`)
                const data = await res.json();
                await console.log(data.catagories[1].items)
                const formattedData = prepData(data);
                CreateChart(formattedData);
            } catch(err){
                console.error(err)
            }
        }
        makeCall();
    },[])
        // makes API call to get data format and prep
    
    const prepData = (data) => {
        const ChartData = {
            labels: [],
            datasets: [
                // {label:'', data: [], backgroundColor:'rgba(245,113,52,0.3)', borderColor:'red', drawBorder:true}
            ]
        }
        
        data.catagories.forEach(catagory => {
            
            ChartData.labels.push(catagory.name)
            
            // ChartData.labels.push(catagory.id)

            let catWeight = 0;
            catagory.items.map(item => {
                catWeight = item.weight + catWeight
                return catWeight
            })
            ChartData.datasets.push({label: catagory.name, data:[catWeight], backgroundColor: 'red'})
            // ChartData.datasets.push(catWeight)

        })
        // for each props push into ChartData.datasets[016].push 
        // ChartData.datasets[0].data.push([14,15,16])
        return ChartData
    }
    const CreateChart = (data) => {
        const ctx = document.querySelector('#packChart');
        const packChart = new Chart(ctx, {
            type:'doughnut',
            data: data, 
        })
    }

    return (
        <>
        <h1> Pack Graph</h1>
        <canvas id='packChart' width="100" height="100"></canvas>
        </>
    )
}
export default PackChart