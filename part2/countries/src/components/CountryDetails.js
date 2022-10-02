import Weather from "./Weather";

const CountryDetails = ({name, capital, area, languages, flag, latlng}) => {
    
    return (
        <>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <p><strong>languages:</strong></p>
            {Object.values(languages).map((language, index) => 
            <>
                <ul>
                    <li key={index}>{language}</li>
                </ul>
            </>
            )}
            <p></p>
            <img src={flag} alt={`${name} flag`} width="300" />
            <Weather name={name} latlng={latlng} />
        </>
    )
}

export default CountryDetails;