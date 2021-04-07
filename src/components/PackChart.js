import React from 'react';
import Chart from 'chart.js';
import { useEffect } from 'react';

const PackChart = (props) => {


    useEffect(()=>{ 
        const makeCall = async () => {
            try{
                const res = await fetch(`http://localhost:3001/packs/${props.packId}`)
                const data = await res.json();
                // await setPackState(data)
                const formattedData = prepData(data);
                CreateChart(formattedData);
            } catch(err){
                console.error(err)
            } 
            
        
        }
        makeCall();
     
    },[props])
        // makes API call to get data format and prep
    const reset = async e => {
            e.preventDefault();
            try{
                const res = await fetch(`http://localhost:3001/packs/${props.packId}`)
                const data = await res.json();
                const formattedData = prepData(data);
                CreateChart(formattedData);
            } catch(err){
                console.error(err)
            } 
            
        }

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
    const CreateChart = (data) => {
        const ctx = document.querySelector('#packChart').getContext('2d');
        const packChart = new Chart(ctx, {
            type:'doughnut',
            data: data, 
        })
    }

    return (
        <>
        <canvas id='packChart'></canvas>
        <br/>
        <button className="reset-button"onClick={reset}/>  
        </>
    )
}
export default PackChart