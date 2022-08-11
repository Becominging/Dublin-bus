import useFetch from "./useFetch.js";

export default function TestuseFetch() {
  // const { data: lines, loading, error } = useFetch("http://127.0.0.1:8000/lines/")
  const { data: lines, loading, error } = useFetch("http://127.0.0.1:8000/prediction/44/0/208/3/540003005/4/6/214/9/")
  return (
    <div className="TestuseFetch">
      { loading && <p>{loading}</p> }
      { lines && <p>{lines['JourneyDuration']}</p> }
      { error && <p>{error}</p> }

      {/* { lines && <p>{lines.map((line) => (
            line['trip_headsign']  
        ))}</p> } */}
      
    </div>
    
  );
}
