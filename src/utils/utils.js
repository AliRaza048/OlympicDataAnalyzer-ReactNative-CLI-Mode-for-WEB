export const removeDuplicatesAndAggregate = (data) => {
  let uniqueData = new Map();
  let tally = {};
      
  // Remove duplicates
  data.forEach(item => {
    const key = `${item.Team}-${item.NOC}-${item.Games}-${item.Year}-${item.City}-${item.Sport}-${item.Event}-${item.Medal}`;
      if (!uniqueData.has(key)) {
          uniqueData.set(key, item);
      
        if (!tally[item.region]) {
          tally[item.region] = { Gold: 0, Silver: 0, Bronze: 0 };
        }
            
        // Summing values (assuming Gold, Silver, and Bronze are numeric)
        tally[item.region].Gold += item.Gold;
        tally[item.region].Silver += item.Silver;
        tally[item.region].Bronze += item.Bronze;
      }
  });
      
  // Convert tally object to an array, calculate total medals, and sort by Gold medals
  return Object.entries(tally).map(([region, medals]) => ({
    region, 
    ...medals,
    Total: medals.Gold + medals.Silver + medals.Bronze // Calculate total medals
  })).sort((a, b) => b.Gold - a.Gold);
};


export const fetchMedalTally = (data, year, country) => {
  let filteredData = data;
  if (year === 'Overall' && country !== 'Overall') {
    return aggregateDataByYearForCountry(data, country);
  }

  if (year !== 'Overall') {
    filteredData = filteredData.filter(item => item.Year.toString() === year);
  }
  
  if (country !== 'Overall') {
    filteredData = filteredData.filter(item => item.region === country);
  }
  
  return removeDuplicatesAndAggregate(filteredData);
};


export const getUniqueYearsAndCountries = (data) => {
  // const years = ['Overall', ...new Set(data.map(item => item.Year.toString()))];
  // const countries = ['Overall', ...new Set(data.map(item => item.region))];

  //sort list picker
  const years = [...new Set(data.map(item => item.Year.toString()))].sort();
  const countries = [...new Set(data.map(item => item.region))].sort();
  
  // 'Overall' ko list ke shuru mein add karenge
  years.unshift('Overall');
  countries.unshift('Overall');

  return { years, countries };
};


export const aggregateDataByYearForCountry = (data, country) => {
  let yearlyTally = {};
  let uniqueEntries = new Set();
  
  data.forEach(item => {
    if (item.region === country) {
      const uniqueKey = `${item.Team}-${item.NOC}-${item.Games}-${item.Year}-${item.City}-${item.Sport}-${item.Event}-${item.Medal}`;
      if (!uniqueEntries.has(uniqueKey)) {
        uniqueEntries.add(uniqueKey);
  
        if (!yearlyTally[item.Year]) {
          yearlyTally[item.Year] = { Gold: 0, Silver: 0, Bronze: 0 };
        }
          
        if (item.Gold) {
          yearlyTally[item.Year].Gold += 1;
        }

        if (item.Silver) {
          yearlyTally[item.Year].Silver += 1;
        }

        if (item.Bronze) {
          yearlyTally[item.Year].Bronze += 1;
        }
      }
    }
  });
  
  return Object.entries(yearlyTally).map(([year, medals]) => ({
    Year: year,
    Gold: medals.Gold,
    Silver: medals.Silver,
    Bronze: medals.Bronze,
    Total: medals.Gold + medals.Silver + medals.Bronze
  })).sort((a, b) => parseInt(a.Year, 10) - parseInt(b.Year, 10));
};
  

export const dataOverTime = (data, column) => {
  const processedData = data.reduce((acc, curr) => {
    const key = `${curr.Year}-${curr[column]}`;
    if (!acc[key]) {
      acc[key] = { label: curr.Year.toString(), value: 0 };
    }
    acc[key].value += 1;
    return acc;
  }, {});

  const sortedData = Object.values(processedData).sort((a, b) => a.label.localeCompare(b.label));

  return sortedData;
};





export const processYourDataIntoHeatmapFormat = (jsonData) => {
  // Initialize an object to hold our processed data
  const processedData = {};

  // Loop through each item in the JSON data
  jsonData.forEach((item) => {
    const { Year, Sport, Event } = item;
    
    // Initialize this sport in the processed data if it doesn't exist
    if (!processedData[Sport]) {
      processedData[Sport] = {};
    }
    
    // Initialize this year for the sport if it doesn't exist
    if (!processedData[Sport][Year]) {
      processedData[Sport][Year] = new Set(); // Use a Set to avoid counting duplicates
    }
    
    // Add the event to the set
    processedData[Sport][Year].add(Event);
  });

  // Now we need to convert this into a 2D array format that our heatmap can use
  const sports = Object.keys(processedData); // Rows are sports
  const years = Array.from(new Set(jsonData.map((item) => item.Year))).sort(); // Columns are years

  const heatmapData = sports.map((sport) =>
    years.map((year) => processedData[sport][year] ? processedData[sport][year].size : 0)
  );

  return { heatmapData, sports, years };
};
