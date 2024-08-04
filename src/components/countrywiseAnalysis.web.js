import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { fetchCountryWiseData } from '../apis/common_apis/common_apis';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { DataTable } from 'react-native-paper'; 

const CountrywiseAnalysis = () => {
    const [countrywisedata, setCountryWiseData] = useState([]);
    const [heatmapData, setHeatmapData] = useState(null);
    const [allCountries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('USA');
    const [loading, setLoading] = useState(true);
    const [tableData,setTableData] = useState(null);

    const fetchData = () => {
        try {
            setLoading(true); // Set loading to true before starting the fetch
            const result = fetchCountryWiseData(selectedCountry);
            console.log("API RESULT:", result);
            result.then((result) => {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);


                setCountryWiseData(result.country_analyse);
                setCountries(result.countries);
                setHeatmapData(result.heatmap);
                setTableData(result.top10);
            });
        } catch (error) {
            console.error("No data received from API");
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedCountry]);

    useEffect(() => {
        console.log("Updated HEATMAP DATA (useEffect):", tableData);
    }, [heatmapData,tableData]);

    const transformHeatmapData = (data) => {
        const years = Object.keys(data);
        const sports = Object.keys(data[years[0]]);
        const values = sports.map((_, index) => years.map(year => data[year][index]));

        return {
            x: years,
            y: sports,
            z: values,
            type: 'heatmap',
            hoverongaps: false,
            colorscale: 'Viridis',
            showscale: true
        };
    };

    const dataTransformData = (data) => {
        return {
            x: data.Year,
            y: data.Medal,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
        };
    };

    return (
        <View>
            <Picker
                selectedValue={selectedCountry}
                onValueChange={(itemValue) => {
                    setSelectedCountry(itemValue);
                }}
                style={styles.picker}
            >
                <Picker.Item label="USA" value="USA" />
                {allCountries.map(country => <Picker.Item key={country} label={country} value={country} />)}
            </Picker>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text style={styles.title}>CountryWiseAnalysis</Text>
                    <Plot
                        data={[dataTransformData(countrywisedata)]}
                        layout={{ title: 'Countrywise Data Analysis' }}
                    />
                    <Text style={styles.title}>{selectedCountry} Excels in the Following Sports</Text>
                    {heatmapData && (
                        <Plot
                            data={[transformHeatmapData(heatmapData)]}
                            layout={{
                                title: `${selectedCountry} Sport Performance`,
                                xaxis: { title: 'Year' },
                                yaxis: { title: 'Sport' },
                                width: 800,
                                height: 600,
                                margin: {
                                    l: 100,
                                    r: 50,
                                    b: 100,
                                    t: 50,
                                }
                            }}
                        />
                    )}
                    
<DataTable style={styles.container}> 
      <DataTable.Header style={styles.tableHeader}> 
        <DataTable.Title>Name</DataTable.Title> 
        <DataTable.Title>Medal</DataTable.Title> 
        <DataTable.Title>Sport</DataTable.Title> 
      </DataTable.Header> 
      


      {tableData.Name.map((row,index)=>(
  <DataTable.Row> 


  <DataTable.Cell>{tableData.Name[index]}</DataTable.Cell> 
  <DataTable.Cell>{tableData.Medals[index]}</DataTable.Cell> 
  <DataTable.Cell>{tableData.Sport[index]}</DataTable.Cell> 
</DataTable.Row> 

      ))}
          </DataTable> 

    
  
     
                </>
                
            )}

        </View>
    );
};

export default CountrywiseAnalysis;

const styles = StyleSheet.create({
    picker: {
        height: 40,
        marginVertical: 5,
        backgroundColor: '#e6e6fa', 
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },

    container: { 
        padding: 15, 
      }, 
      tableHeader: { 
        backgroundColor: '#DCDCDC', 
      }, 
});
