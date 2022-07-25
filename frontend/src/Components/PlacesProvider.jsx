// import useFetch from "./useFetch.js";

import axios from "axios";


const getPlacesData = async (type, latitude, longitude) => {
    try{
        const {data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-by-latlng`, {
          
            params: {
                latitude: latitude,
                longitude: longitude
              },
              headers: {
                'X-RapidAPI-Key': '2174692833mshb3718abbcc2e868p1d702bjsnd1f8af500222',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
            
        });
        console.log('getPlacesData:', data)
        return data;
    }
    catch(error){
        console.log(error);
    }
}

export default getPlacesData

// export const PlacesProvider = async (type, sw, ne) => {
    
//     const { data: explore, loading, error } = useFetch("https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary", {
          
//         params: {
//             bl_latitude: sw.lat,
//             tr_latitude: ne.lat,
//             bl_longitude: sw.lng,
//             tr_longitude: ne.lng,
//         },
//         headers: {
//             'X-RapidAPI-Key': '2174692833mshb3718abbcc2e868p1d702bjsnd1f8af500222',
//             'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
//         }
    
//     });
        
    
//     return explore;
    
    
// }