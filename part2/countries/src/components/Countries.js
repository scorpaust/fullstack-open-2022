import Country from "./Country";
import CountryDetails from "./CountryDetails";

const Countries = ({countries}) => {

    return (
        <>
        {countries.length === 0 &&
            <>
                <p>Please, specicy a filter</p>
            </>
        }
        {countries.length > 10 &&
            <>
                <div>
                    <p>Too many matches, specify another filter</p>
                </div>
            </>
        } 
        {countries.length > 1 && countries.length <= 10 &&
            <>
                <ul>
                    {countries.map((country, index) => <Country index={index} name={country.name.common} capital={country.capital} area={country.area} languages={country.languages} flag={country.flags.svg} latlng={country.latlng} />)}
                </ul>
            </>
        }
        {countries.length === 1 &&
            <>
                <ul>
                    {countries.map((country, index) => <CountryDetails key={index} name={country.name.common} capital={country.capital} area={country.area} languages={country.languages} flag={country.flags.svg} latlng={country.latlng}  />)}
                </ul>
            </>        
        }
        </>
    )
}

export default Countries;