// import React from 'react';
// import Chart from 'chart.js';
// import  {useEffect, useState} from 'react';
// const PackChart = (props) => {

//     const [pack, setPack] = useState({});

//     useEffect(()=>{
//         const makeChart = async () => {
//             try{
//                 const formattedData = prepData();
//                 await createChart(formattedData)
//             }catch(err){
//                 console.error(err)
//             }
//         }
//         makeChart();
//     }, [])

//     const chartData = {
//             labels: [props.cats],
//             datasets: [props.weights]
//         }
//     const prepData = (props) =>{

//         chartData.labels = props.cats;
//         chartData.datasets = props.weight;
//     }
//         const createChart = () => {
//             const ctx = document.querySelector('#chart');
//             const packChart = new Chart(ctx, {
//                 type: 'doughnut',
//                 data: chartData
//             })
//         }
    
//     return (
//         <>
//         <h1> Pack </h1>
//         <canvas id='chart' width="500" height="500"></canvas>
//         </>
//     )
// }
// export default PackChart