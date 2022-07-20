import { useState } from "react";
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

const LineInfo= ({ selectedLine }) => {
  
  // State for the pagination in the results
  const [page, setPage] = useState(1)
  
  // function that sets the results page with the new value
  const onChange = (page) => {
    setPage(page)
    console.log(page)
  }
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">

          <div className="text-sm font-medium bg-gray-100 px-4 py-5 sm:grid sm:px-6">
            {selectedLine['route__route_short_name']},{selectedLine['trip_headsign']}
          </div>

          {selectedLine.stops.slice((page - 1) * 10, ((page - 1) * 10) + 10).map((stop) => {
            return (
              <div key={stop['stop_id']} className="bg-gray-50 py-2 sm:grid sm:grid-cols-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 border-dashed">{stop['stop_sequence']}</dt>
                <dd className="text-sm text-gray-900 sm:col-span-3">{stop['stop_name']}</dd>
              </div>          
            );
          })}
          
        </dl>

        {/* Pagination to control the number of results displayed */}
        {(selectedLine.stops.length > 0) &&
        <div className="flex place-content-center w-full items-center px-3 py-2">
          <Pagination current={page} onChange={onChange} showSizeChanger={false} total={Math.ceil(selectedLine.stops.length)}/>
        </div>} 

      </div>
    </div> 
  )
  
}

export default LineInfo;