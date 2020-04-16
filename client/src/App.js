import React from 'react';
import { Cards,Chart,CountryPicker} from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImage from './images/pic.png';
import axios from 'axios';


//require('dotenv').config();
class App extends React.Component{

    state = {
        data : {}
    }
    async componentDidMount(){
        const fetchedData = await fetchData();
        console.log(fetchedData);
        this.setState({ data: fetchedData })
    }
    handleCountryChange = async(country)=>{
        const fetchedData = await fetchData(country);
        this.setState({ data: fetchedData, country: country });
        const Country = {
            countryname: country
        };
        axios.post('http://localhost:5000/countries/add',Country)
            .then(res=>console.log(res.data));
        // console.log(fetchedData);
        // console.log(country);

    }
    render(){
        const { data,country } = this.state;

        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;