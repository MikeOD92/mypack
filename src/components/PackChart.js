import React from 'react';
import Chart from 'chart.js';
import { useState, useEffect } from 'react';

const PackChart = (props) => {

    const [baseWeight, setBaseWeight] = useState(0); 

    useEffect(()=>{ 
        const makeCall = async () => {
            try{
                const res = await fetch(`https://my-pack-api.herokuapp.com/packs/${props.packId}`)
                const data = await res.json();
                const formattedData = prepData(data);
                getBaseWeight(data);
                console.log(baseWeight)
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
                const res = await fetch(`https://my-pack-api.herokuapp.com/packs/${props.packId}`)
                const data = await res.json();
                const formattedData = prepData(data);
                getBaseWeight(data);
                CreateChart(formattedData);
                console.log(baseWeight)
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
        <p> Base weight: {(baseWeight/16).toFixed(2)} lbs / {baseWeight.toFixed(2)}oz</p>
        <button className="reset-button"onClick={reset}/>
        </>
    )
}
export default PackChart