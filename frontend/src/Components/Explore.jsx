import { XIcon} from '@heroicons/react/outline'

import React, {useState, useEffect, createRef} from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

import PlaceDetails from './PlaceDetails'


const Explore = ({ onPlaceChanged, onLoad, places, type, setType, rating, setRating, childClicked, isLoading, selectedPlace, setSelectedPlace}) => {
  console.log("Places:",places)
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <> 

    <div className="w-full flex flex-col items-center space-y-8 sm:items-end p-2">
      <div className="max-w-sm mx-auto w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-2">
          

          <div className="w-full items-center">
            {/* <Typography variant='h5'>
              Restaurants, Hotels & Attractions
            </Typography> */}

            {isLoading ? (
              <div >
                <CircularProgress size="5rem"/>
              </div>
            ) : (
              <>
                <div className="max-w-sm mx-auto w-full space-y-5 p-2">
                  <FormControl className="max-w-sm mx-auto w-full space-y-5 p-2">
                    <InputLabel>Type</InputLabel>
                      <Select value={type} onChange={(e) => setType(e.target.value)}>
                        <MenuItem value="restaurants">Restaurants</MenuItem>
                        <MenuItem value="hotels">Hotels</MenuItem>
                        <MenuItem value="attractions">Attractions</MenuItem>
                      </Select>
                  </FormControl>
              
                  <FormControl className="max-w-sm mx-auto w-full space-y-5 p-2">
                    <InputLabel>Rating</InputLabel>
                      <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <MenuItem value={0}>All</MenuItem>
                        <MenuItem value={3}>Above 3.0</MenuItem>
                        <MenuItem value={4}>Above 4.0</MenuItem>
                        <MenuItem value={4.5}>Above 4.5</MenuItem>
                      </Select>
                  </FormControl> 
                </div>

                {!selectedPlace&&<Grid container spacing={3}>
                  {places?.map((place, i) => (
                    <Grid ref={elRefs[i]} item key={i} xs={12}>
                    <PlaceDetails
                      selected={Number(childClicked) === i}
                      refProp={elRefs[i]}
                      place={place}
                    />
                    </Grid>
                  ))}
                </Grid>}
                {selectedPlace&&<Grid container spacing={3}>
                  
                    <Grid ref={elRefs[0]} item key={0} xs={12}>
                    <PlaceDetails
                      selected={Number(childClicked) === 0}
                      refProp={elRefs[0]}
                      place={selectedPlace}
                    />
                    <button
                    className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      cleanSelect()
                    }}
                  >
                    <span className="sr-only">Clean Search</span>
                    <XIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                    </Grid>
                  
                </Grid>}
              </>
            )}
          </div>

          </div>
      </div>
    </div>
    </>
  )

  // Function to clean the search
  function cleanSelect() {
    setSelectedPlace(null);
    console.log("cleanSelect")
  }

}

export default Explore