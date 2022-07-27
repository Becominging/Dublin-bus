import React from 'react'
import { ClockIcon } from '@heroicons/react/outline'
import useFetch from "./useFetch.js"
import moment from "moment"


const Results = ({ selectedLine, origin, destination, selectedTime }) => {
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
  
  return (
    <div className="w-full flex flex-col items-center space-y- sm:items-end px-0 py-2">
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-auto">
              <div className="p-2">
                <div className="flex items-start">

                  <div className="flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
                  </div>

                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">Journey Duration:</p>
                    <p className="mt-1 text-sm text-gray-500">About {results && Math.round(results['JourneyDuration']/60)} mins</p>
                  </div>

                </div>
              </div>
            </div>
        </div>
  )
}

export default Results