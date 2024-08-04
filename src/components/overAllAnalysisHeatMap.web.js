import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { fetchOverallAnalysisHeatmapData } from '../apis/common_apis/common_apis';

const OverallAnalysisHeatMap = () => {
    const [heatmapData, setHeatmapData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true); // Set loading to true before starting the fetch
            const result = await fetchOverallAnalysisHeatmapData();
            console.log("API RESULT:", result);
            setHeatmapData(result.heatmap);
        } catch (error) {
            console.error("No data received from API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const transformHeatmapData = (data) => {
        const years = Object.keys(data);
        const sports = Object.keys(data[years[0]]);
        const values = sports.map((sport) => years.map((year) => data[year][sport] || 0));

        return {
            x: years,
            y: sports,
            z: values,
            type: 'heatmap',
            hoverongaps: false,
            colorscale: 'Viridis'
        };
    };

    return (
        <View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text style={styles.title}>No. of Events over time (Every Sport)</Text>
                    {heatmapData && (
                        <Plot
                            data={[transformHeatmapData(heatmapData)]}
                            layout={{
                                title: 'Overall Sport Performance',
                                xaxis: { title: 'Year' },
                                yaxis: { title: 'Sport' },
                                width: 800,
                                height: 600
                            }}
                        />
                    )}
                </>
            )}
        </View>
    );
};

export default OverallAnalysisHeatMap;

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
});
