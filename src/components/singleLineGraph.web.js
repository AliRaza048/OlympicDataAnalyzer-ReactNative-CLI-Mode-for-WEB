import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchAnalyseOverYearData } from '../apis/common_apis/common_apis';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

const SingleLineGraph = () => {
  const [participatingData, setParticipatingData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [athletesData, setAthletesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const participaters = await fetchAnalyseOverYearData('region');
      setParticipatingData(participaters);

      const events = await fetchAnalyseOverYearData('Event');
      setEventsData(events);

      const athletes = await fetchAnalyseOverYearData('Name');
      setAthletesData(athletes);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const participatingDataTransformData = (data) => {
    return {
      x: data.Edition,
      y: data.region,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
    };
  };

  const eventDataTransformData = (data) => {
    return {
      x: data.Edition,
      y: data.Event,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
    };
  };

  const athletesDataTransformData = (data) => {
    return {
      x: data.Edition,
      y: data.Name,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue' },
    };
  };

  const isMobile = Dimensions.get('window').width < 768;

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Participating Nations over the years</Text>
      <Plot
        data={[participatingDataTransformData(participatingData)]}
        layout={{
          title: 'Participating Nations over the years',
          width: isMobile ? 300 : 800,
          height: isMobile ? 300 : 600,
        }}
      />

      <Text style={styles.title}>Events over the years</Text>
      <Plot
        data={[eventDataTransformData(eventsData)]}
        layout={{
          title: 'Events over the years',
          width: isMobile ? 300 : 800,
          height: isMobile ? 300 : 600,
        }}
      />

      <Text style={styles.title}>Athletes over the years</Text>
      <Plot 
        data={[athletesDataTransformData(athletesData)]}
        layout={{
          title: 'Athletes over the years',
          width: isMobile ? 300 : 800,
          height: isMobile ? 300 : 600,
        }}
      />
    </View>
  );
};

export default SingleLineGraph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});
