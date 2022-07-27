import useFetch from "./useFetch.js"
import axios from "axios"
import moment from "moment"

const PredictionProvider = async ( selectedLine, origin, destination, selectedTime ) => {
    console.log("Prediction Provider:",selectedLine, origin, destination, selectedTime)
    
    const { data: results, loading, error } = useFetch("http://127.0.0.1:8000/prediction/" 
    + selectedLine.route__route_short_name + '/'
    + selectedLine.direction_id + '/'
    + origin.stop_number + '/'
    + origin.stop_sequence + '/'
    + moment(selectedTime).hour()*60*60+moment(selectedTime).minute()*60+moment(selectedTime).second() + '/'
    + moment(selectedTime).day() + '/'
    + moment(selectedTime).month() + '/'
    + destination.stop_number + '/'
    + destination.stop_sequence + '/')
    
    console.log('Prediction Provider Data:', results)
    
    // return (results)


    try{
        const {data: { data }} = await axios.get("http://127.0.0.1:8000/prediction/" 
        + selectedLine.route__route_short_name + '/'
        + selectedLine.direction_id + '/'
        + origin.stop_number + '/'
        + origin.stop_sequence + '/'
        + moment(selectedTime).hour()*60*60+moment(selectedTime).minute()*60+moment(selectedTime).second() + '/'
        + moment(selectedTime).day() + '/'
        + moment(selectedTime).month() + '/'
        + destination.stop_number + '/'
        + destination.stop_sequence + '/');
        console.log('Prediction Provider Data:', data)
        return data;
    }
    catch(error){
        console.log(error);
    }

}

export default PredictionProvider