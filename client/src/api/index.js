import axios from 'axios';
const url = "https://covid19.mathdro.id/api";

export const fetchData = async(country)=>{
    let changeableUrl = url;
    if(country){
        changeableUrl = `${url}/countries/${country}`;
        // console.log(typeof country === 'string');
        // console.log(country);
        
    }
    try{
        const { data : { confirmed, recovered ,deaths, lastUpdate }} = await axios.get(changeableUrl);
        console.log( { confirmed, recovered ,deaths, lastUpdate });
        return {
            confirmed,
            recovered,
            deaths,
            lastUpdate,
            country
        };
    } catch(error){
        console.log(error);
    }
}
export const fetchDailyData = async()=>{

    try{
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData)=>({
           confirmed: dailyData.confirmed.total,
           deaths: dailyData.deaths.total,
           date: dailyData.reportDate
        }));

        return modifiedData;

    }catch(error){

    }
}

export const fetchCountries = async()=>{
    try{
        const { data :{countries}} = await axios.get(`${url}/countries`);
        return countries.map((country)=>country.name);
    } catch(error){
        console.log(error);
    }
}