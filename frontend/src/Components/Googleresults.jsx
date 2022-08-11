import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import ReactPlayer from 'react-player';

import { useStateContext } from '../contexts/StateContextProvider';
// import { Loading } from './Loading';
// import { getResults} from '../contexts/StateContextProvider';

export const Googleresults = () => {
  const { results, getResults, searchTerm } = useStateContext();
  const location = useLocation();

  useEffect(() => {
        getResults(`/search/q=${searchTerm}&num=10`);
      
    }
  , [searchTerm]);
  if (location.pathname==='/search') 
  return (
  <div className="w-96 fixed items-center justify-start space-y-8 sm:items-end p-2 mt-20">
    {results?.results?.map(({ link, title }, index) => (
      <div key={index} className="w-72">
        <a href={link} target="_blank" rel="noreferrer">
          <p className="text-sm dark:text-white text-green-700 ">{link.length > 30 ? link.substring(0, 30) : link}</p>
          <p className="text-lg hover:underline dark:text-white text-green-700  ">{title}</p>
        </a>
      </div>
    ))}
  </div>);
 


 
};