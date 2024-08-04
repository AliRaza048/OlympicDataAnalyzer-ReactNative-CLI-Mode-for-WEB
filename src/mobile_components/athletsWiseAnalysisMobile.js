import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Plotly from 'react-native-plotly';

const AthleteWiseAnalysis = () => {
  const [data, setData] = useState({ x1: [], x2: [], x3: [], x4: [] });

  useEffect(() => {
    const getData = async () => {
      const response = await fetchData('your-api-endpoint/athlete-wise-analysis/');
      setData(response);
    };

    getData();
  }, []);

  const plotData = [
    { x: data.x1, type: 'histogram', name: 'Overall Age', opacity: 0.5 },
    { x: data.x2, type: 'histogram', name: 'Gold Medalist', opacity: 0.5 },
    { x: data.x3, type: 'histogram', name: 'Silver Medalist', opacity: 0.5 },
    { x: data.x4, type: 'histogram', name: 'Bronze Medalist', opacity: 0.5 },
  ];

  return (
    <View>
      <Text>Distribution of Age</Text>
      <Plotly
        data={plotData}
        layout={{ barmode: 'overlay', width: 800, height: 600 }}
        style={{ width: '100%', height: 400 }}
      />
    </View>
  );
};

export default AthleteWiseAnalysis;
