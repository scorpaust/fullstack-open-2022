import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');

  const handleNewFilter = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }
  
  useEffect(() => {
    function getFetchUrl() {
      return `https://restcountries.com/v3.1/name/${newFilter}`;
    }
  
    async function fetchData() {
      await axios(getFetchUrl()).then(result => {
        setCountries(result.data);
      }).catch(e => console.log(e.message));
      
    }
    
    fetchData();

  }, [newFilter])

  return (
    <>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <Countries countries={countries} />
    </>
  );
}

export default App;
