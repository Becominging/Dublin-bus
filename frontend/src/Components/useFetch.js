import { useState, useEffect } from 'react';
import axios from 'axios';
import { CircularProgress, Grid } from '@material-ui/core';
export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
      setLoading(
        <div className="w-full flex flex-col items-center space-y-8 sm:items-end p-2">
          <div className="max-w-sm mx-auto w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-2">
              <CircularProgress size="5rem"/>
            </div>
          </div>
         </div>
      )
      setData(null);
      setError(null);
      const source = axios.CancelToken.source();
      axios.get(url, { cancelToken: source.token })
      .then(res => {
          setLoading(false);
          console.log("What we have fetched():",res)
          setData(res.data);
      })
      .catch(err => {
        //   setLoading(false)
          setError('An error occurred. Awkward..')
          console.log("An error occurred:",err)
      })
      return () => {
          source.cancel();
      }
  }, [url])
  
  return { data, loading, error }
}