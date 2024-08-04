import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchAthletsWiseAnalysisData, fetchFamousSportAnalysisData, fetchHeightVsWeighData, fetchMenVsWomenData } from '../apis/common_apis/common_apis';

const AthleteWiseAnalysis = () => {
  const [data, setData] = useState({ x1: [], x2: [], x3: [], x4: [] });
  const [data2, setData2] = useState({ x: [], name: [] });
  const [data3, setData3] = useState([]);

  const getData = async () => {
    var response1 =  fetchAthletsWiseAnalysisData();

    response1.then((result)=>{
        setData(result);

    });

    var response2  = fetchFamousSportAnalysisData();

    response2.then((result)=>{

        setData2(result);

    });


// var response3 = fetchMenVsWomenData();

const result = await fetchMenVsWomenData();
setData3(result); 
console.log(result);




    
    
  }


  useEffect(() => {
   

    getData();

  }, []);





  const transformedData = data2.x.map((values, index) => ({
    x: values,
    type: 'histogram',
    name: data2.name[index],
    opacity: 0.5,
  }));



  return (


    <div>
        <div>
      <h1>Distribution of Age</h1>
      <Plot
        data={[
          { x: data.x1, type: 'histogram', name: 'Overall Age', opacity: 0.5 },
          { x: data.x2, type: 'histogram', name: 'Gold Medalist', opacity: 0.5 },
          { x: data.x3, type: 'histogram', name: 'Silver Medalist', opacity: 0.5 },
          { x: data.x4, type: 'histogram', name: 'Bronze Medalist', opacity: 0.5 },
        ]}
        layout={{ barmode: 'overlay', width: 800, height: 600 }}
      />
</div>

<div>
      <h1>Distribution of Age wrt Sports (Gold Medalist)</h1>
      <Plot
        data={transformedData}
        layout={{ barmode: 'overlay', width: 800, height: 600 }}
      />


    </div>


    <div>
      <h1>Men vs. Women Participation Over the Years</h1>
      <Plot
        data={[
          {
            x: data3.map(item => item.Year),
            y: data3.map(item => item.Male),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Male',
          },
          {
            x: data3.map(item => item.Year),
            y: data3.map(item => item.Female),
            type: 'scatter',
            mode: 'lines+markers',
            name: 'Female',
          },
        ]}
        layout={{ width: 800, height: 600 }}
      />
    </div>

    </div>
  );
};

export default AthleteWiseAnalysis;

