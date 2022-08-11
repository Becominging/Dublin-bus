import { useState } from "react";
import useFetch from "./useFetch.js";
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

const BusArrivalInfo= ({ selectedStop, setSelectedStop}) => {

  // Fetch the selected stop
  const { data: fetchedStop, loading, error } = useFetch("http://127.0.0.1:8000/stop_info/" + selectedStop['stop_id']);
  console.log("Fetched Stop:",fetchedStop)
  
  // State for the pagination in the results
  const [page, setPage] = useState(1)
  
  // function that sets the results page with the new value
  const onChange = (page) => {
    setPage(page)
    console.log(page)
  }

  return (
    fetchedStop&&<div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">
            {/* If there is no arrivals */}
            {(fetchedStop.arriving_bus_info.length === 0) && 
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">No scheduled buses</dt>
                </div>}

            {/* If there is arrivals */}
            {(fetchedStop.arriving_bus_info.length > 0) && fetchedStop.arriving_bus_info.sort(compare) &&
                fetchedStop.arriving_bus_info.slice((page - 1) * 10, ((page - 1) * 10) + 10).map((arrival) => {
                return (
                    <div key={arrival.trip_id} className="place-content-center bg-gray-50 px-2 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 border-dashed">{arrival['route_name']}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Arrive at: {arrival['scheduled_arrival_time']}, Delay: {arrival['delay_in_sec']} sec</dd>
                    </div>          
                );
            })}
        </dl>

      {/* Pagination to control the number of results displayed */}
      {(fetchedStop.arriving_bus_info.length > 0) &&
        <div className="flex place-content-center w-full items-center px-3 py-2">
          <Pagination current={page} onChange={onChange} total={Math.ceil(fetchedStop.arriving_bus_info.length)}/>
        </div>}      

      </div>
    </div> 
  )
  
  // Function that compares the values to perform the sort
  function compare(a, b) {
    if (a.due_in_min < b.due_in_min) {
      return -1;
    }
    if (a.due_in_min > b.due_in_min) {
      return 1;
    }
    return 0;
  }
  
}

export default BusArrivalInfo;