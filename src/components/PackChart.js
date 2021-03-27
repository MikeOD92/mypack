// import React from 'react';
// import Chart from 'chart.js';
// import  {useEffect, useState} from 'react';
// const PackChart = () => {

    // const [pack, setPack] = useState({});

    // useEffect(()=>{
    //         ( async ()=>{
    //         try{
    //             const response = await fetch('http://localhost:3001/packs/3');
    //             const data = await response.json();
    //             setPack(data)
    //         }catch(err){
    //             console.error(err)
    //         }finally{
    //             const formateddata = prepData(pack);
    //             createChart(formateddata)
    //         }
        
    //         })()
    //     },[]
    //     )
    // const prepData = (data) =>{
    //     const chartData = {
    //         labels: [],
    //         datasets: [ { label: 'catagory weight', data: [] } ]
    //     }
    //     data.catagories.forEach(item => {
    //       chartData.labels.push(item.id)
    //       chartData.datasets.push(item.weight)
    //     })
    //     return chartData
    //     }

    //     const createChart = (data) => {
    //         const ctx = document.querySelector('#chart');
    //         const packChart = new Chart(ctx, {
    //             type: 'doughnut',
    //             data: data
    //         })
    //     }
    
//     return (
//         <>
//         <h1> Pack </h1>
//         <canvas id='chart' width="500" height="500"></canvas>
//         </>
//     )
// }
// export default PackChart