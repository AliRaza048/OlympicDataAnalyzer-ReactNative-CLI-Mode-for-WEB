
import axios from 'axios';
import { analysisOverYearUrl, athletswiseAnalysisUrl, countrywiseAnalysisUrl, famousSportUrl, heatMapNoEventsUrl, heightWeightUrl, medalTallyUrl, menWomenUrl, uniqueCountryYearSportUrl } from '../urls';

export const fetchFilterOptions = async () => {
    try {
        const response = await axios.get(uniqueCountryYearSportUrl);
        return {"countries":response.data.countries,'years':response.data.years,'sports':response.data.sports};
    } catch (error) {
        console.error(error);
    }
};





// MEDALL TALLY DATA 

export const fetchMedallTallyData = async (year,country) => {
    try {
        const response = await axios.get(`${medalTallyUrl}${year}/${country}`);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};



// GRAPH DATA 

export const fetchAnalyseOverYearData= async (analysir) => {
    try {
        const response = await axios.get(`${analysisOverYearUrl}${analysir}`);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};



// COUNTRYWISE DATA 

export const fetchCountryWiseData= async (country) => {
    try {
        const response = await axios.get(`${countrywiseAnalysisUrl}${country}`);

        return response.data;
    } catch (error) {
        console.error(error);
    }
};




// ATHLETS WISE ANALYSIS 


export const fetchAthletsWiseAnalysisData = async()=>{


    try {
        const response = await axios.get(`${athletswiseAnalysisUrl}`);
        return response.data;

    } catch (error) {
        console.error(error);

    }
}


// FAMOUS SPORTS ANALYSIS 

export const fetchFamousSportAnalysisData = async()=>{


    try {
        const response = await axios.get(`${famousSportUrl}`);
        return response.data;

    } catch (error) {
        console.error(error);

    }
}


export const fetchHeightVsWeighData = async(selectedSport)=>{


    try {
        const response = await axios.get(`${heightWeightUrl}/${selectedSport}`);
        return response.data;

    } catch (error) {
        console.error(error);

    }
}





export const fetchMenVsWomenData = async()=>{


    try {
        const response = await axios.get(`${menWomenUrl}`);
        return response.data;

    } catch (error) {
        console.error(error);

    }
}




// OVERALL ANALYSIS HEATMAP 


export const fetchOverallAnalysisHeatmapData = async()=>{


    try {
        const response = await axios.get(`${heatMapNoEventsUrl}`);
        return response.data;

    } catch (error) {
        console.error(error);

    }
}
