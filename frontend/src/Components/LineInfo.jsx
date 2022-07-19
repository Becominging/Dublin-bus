const LineInfo= ({ selectedLine }) => {
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="border-t border-gray-200">
        <dl className="sm:divide-y sm:divide-gray-200">

          <div className="text-sm font-medium bg-gray-100 px-4 py-5 sm:grid sm:px-6">
            {selectedLine['route__route_short_name']},{selectedLine['trip_headsign']}
          </div>

          {selectedLine.stops.map((stop) => {
            return (
              <div key={stop['stop_id']} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 border-dashed">{stop['stop_sequence']}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{stop['stop_name']}</dd>
              </div>          
            );
          })}
          
        </dl>
      </div>
    </div> 
  )
  
}

export default LineInfo;