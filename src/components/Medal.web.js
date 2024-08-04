import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Platform, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const MedalTallyTable = () => {
    const [selectedYear, setSelectedYear] = useState('Overall');
    const [selectedCountry, setSelectedCountry] = useState('Overall');
    const [tableData, setTableData] = useState([]);
    const [years, setYears] = useState([]);
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextPage, setNextPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetchInitialData();
        fetchFilterOptions();
    }, []);

    useEffect(() => {
        fetchData();
    }, [selectedYear, selectedCountry]);


    
    const fetchFilterOptions = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/olympicunique_years_and_countries/');
            setYears(response.data.years);
            setCountries(response.data.countries);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchInitialData = () => {
        setTableData([]);
        setNextPage(1);
        setHasMore(true);
    };

    const fetchData = async () => {
        if (!hasMore) return;
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/olympicmedal_tally/', {
                params: {
                    year: selectedYear,
                    country: selectedCountry,
                    page: nextPage,
                },
            });
            setTableData(prevData => [...prevData, ...response.data.results]);
            setHasMore(response.data.next !== null);
            setNextPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const tableHead = selectedYear === 'Overall' && selectedCountry !== 'Overall'
        ? ['#', 'Year', 'Gold', 'Silver', 'Bronze', 'Total']
        : ['#', 'Region', 'Gold', 'Silver', 'Bronze', 'Total'];

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <Text style={styles.heading}>Select Year</Text>
                <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => {
                        setSelectedYear(itemValue);
                        fetchInitialData();
                    }}
                    style={styles.picker}>
                    <Picker.Item label="Overall" value="Overall" />
                    {years.map(year => <Picker.Item key={year} label={year} value={year} />)}
                </Picker>

                <Text style={styles.heading}>Select Country</Text>
                <Picker
                    selectedValue={selectedCountry}
                    onValueChange={(itemValue) => {
                        setSelectedCountry(itemValue);
                        fetchInitialData();
                    }}
                    style={styles.picker}>
                    <Picker.Item label="Overall" value="Overall" />
                    {countries.map(country => <Picker.Item key={country} label={country} value={country} />)}
                </Picker>

                <View style={styles.tableHeader}>
                    {tableHead.map((header, index) => (
                        <Text key={index} style={[styles.cell, styles.header, styles[`column${index}`]]}>{header}</Text>
                    ))}
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                {tableData.length > 0 ? (
                    tableData.map((row, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={[styles.cell, styles.column0]}>{index + 1}</Text>
                            <Text style={[styles.cell, styles.column1]}>{selectedYear === 'Overall' && selectedCountry !== 'Overall' ? row.Year : row.region}</Text>
                            <Text style={[styles.cell, styles.column2]}>{row.Gold}</Text>
                            <Text style={[styles.cell, styles.column3]}>{row.Silver}</Text>
                            <Text style={[styles.cell, styles.column4]}>{row.Bronze}</Text>
                            <Text style={[styles.cell, styles.column5]}>{row.Total}</Text>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No data available</Text>
                )}
            </ScrollView>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                hasMore && <Button title="Load More" onPress={fetchData} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#f0f8ff', // Light blue background for an attractive look
    },
    topView: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    picker: {
        height: 40,
        marginVertical: 5,
        backgroundColor: '#e6e6fa', // Light purple for a gentle touch
        borderRadius: 5,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: '#4682b4', // Steel blue for header background
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    header: {
        fontWeight: 'bold',
        color: 'white', // White text for header
    },
    cell: {
        marginHorizontal: 5,
        textAlign: 'center',
        color: '#333', // Darker text color for better readability
    },
    column0: {
        width: 30,
        backgroundColor: '#ffebcd', // Blanched almond for index column
    },
    column1: {
        width: 100,
        backgroundColor: '#98fb98', // Pale green for year/region column
    },
    column2: {
        width: 60,
        backgroundColor: '#ffd700', // Gold for gold medals
    },
    column3: {
        width: 60,
        backgroundColor: '#c0c0c0', // Silver for silver medals
    },
    column4: {
        width: 60,
        backgroundColor: '#cd7f32', // Bronze for bronze medals
    },
    column5: {
        width: 60,
        backgroundColor: '#87ceeb', // Sky blue for total column
    },
    scrollView: {
        marginHorizontal: 15,
    },
    noDataText: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 18,
    },
});

export default MedalTallyTable;
