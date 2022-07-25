import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar,InputBase, Box } from '@material-ui/core'
import { SearchIcon } from '@heroicons/react/solid'


const SearchPlace = ({ onPlaceChanged, onLoad }) => {
  
  
  return  (
    <>
   
    
    <Box display="flex">
    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
      <div >
        <div >
          {/* <SearchIcon /> */}
        </div>
        <InputBase placeholder="Search…" />
      </div>
    </Autocomplete>
    </Box>
  
    </>

  )
}

  export default SearchPlace;