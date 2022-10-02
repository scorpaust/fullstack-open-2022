import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({name, latlng}) => {

    const [weather, setWeather] = useState({})

    useEffect(() => {
        
        function getFetchUrl() {
            return `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`;
        }
        
        async function fetchData() {
        await axios(getFetchUrl()).then(result => {
            setWeather(result.data);
        }).catch(e => console.log(e.message));
        }

        fetchData();

    }, [latlng])

    const tempToCelsius = (temp) => {
        var fTemp = temp;
        var fToCel = fTemp - 273;
        var message = fToCel.toFixed(2) + ' \xB0C.';
        return message;
    }

    return (
        <>
        {weather.main !== null && weather.main !== undefined &&
            <>
                <h1>Weather in {name}</h1>
                <p>temperature {tempToCelsius(weather.main.temp)}</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${name}'s weather`} />
                <p>wind {weather.wind.speed} m/s</p>
            </>
        }
        </>
    )

}

export default Weather;