import useFetch from "./useFetch.js";

export default function TestuseFetch() {

  const { data: lines, loading, error } = useFetch("http://ec2-54-170-219-111.eu-west-1.compute.amazonaws.com:8000/prediction/44/0/208/3/540003005/4/6/214/9/")
  return (
    <div className="TestuseFetch">
      {loading && <p>{loading}</p>}
      {lines && <p>{lines['JourneyDuration']}</p>}
      {error && <p>{error}</p>}

      {/* { lines && <p>{lines.map((line) => (
            line['trip_headsign']  
        ))}</p> } */}

    </div>

  );
}
