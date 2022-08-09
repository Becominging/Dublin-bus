import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();
const baseUrl = 'https://google-search3.p.rapidapi.com/api/v1';

export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  // const [loading, setLoading] = useState(false);     //true when fetching data from API
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async (url) => {
    // setLoading(true);

    const res = await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      headers: {
        'X-User-Agent': 'desktop',
        'X-Proxy-Location': 'EU',
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': '18c7232a1fmsh5e69bc86dc62eeap11f2c1jsn9c96d8e5aefb',
      },
    });

    const data = await res.json();
    console.log(data);

    setResults(data);
    // setLoading(false);
  };

  return ( //, loading
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm }}> 
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
