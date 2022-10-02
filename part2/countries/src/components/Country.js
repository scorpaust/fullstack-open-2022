import { useState } from "react";
import CountryDetails from "./CountryDetails";

const Country = ({ index, name, capital, area, languages, flag, latlng }) => {

    const [show, setShow] = useState(false)

    const handleClick = (event) => {
      event.preventDefault();
      setShow(!show)
    }

    return (
        <>
          <li key={index}>{name} <button onClick={handleClick}>{show ? 'not show' : 'show' }</button></li>
          {show &&
            <CountryDetails name={name} capital={capital} area={area} languages={languages} flag={flag} latlng={latlng} />
          }
        </> 
      )

}

export default Country;