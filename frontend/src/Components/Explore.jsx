import { XIcon} from '@heroicons/react/outline'
import { Pagination } from 'antd';
import React, {useState, useEffect, createRef} from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import PlaceDetails from './PlaceDetails'
import SelectListType from './SelectListType';
import SelectListRating from './SelectListRating';


const Explore = ({ onPlaceChanged, onLoad, places, type, setType, rating, setRating, childClicked, isLoading, selectedPlace, setSelectedPlace}) => {
  console.log("Places:",places)
  const [elRefs, setElRefs] = useState([]);
  
  // State for the pagination in the results
  const [page, setPage] = useState(1)

  // function that sets the results page with the new value
  const onChange = (page) => {
    setPage(page)
    console.log(page)
  }

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
                <div className="max-w-sm mx-auto w-full space-y-5 px-2 pt-2 pb-6">
                  
                  <SelectListType
                    type={type}
                    setType={setType}
                  />
              
                  <SelectListRating
                    rating={rating}
                    setRating={setRating}
                  />
                  
                </div>

                {!selectedPlace&&
                  <Grid container spacing={3}>
                    {places?.slice((page - 1) * 1, ((page - 1) * 1) + 1).map((place, i) => (
                      <Grid ref={elRefs[i]} item key={i} xs={12}>
                        <PlaceDetails
                          selected={Number(childClicked) === i}
                          refProp={elRefs[i]}
                          place={place}
                        />
                      </Grid>
                    ))}
                    {/* Pagination to control the number of results displayed */}
                    {places && <div className="flex place-content-center w-full items-center px-3 py-2">
                      <Pagination current={page} onChange={onChange} showSizeChanger={false} showQuickJumper={false} pageSize={1} total={Math.ceil(places.length)}/>
                    </div>}
                  </Grid>
                }
                    

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