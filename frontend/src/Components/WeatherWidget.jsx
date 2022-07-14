import ReactWeather, { useOpenWeather } from 'react-open-weather';

const WeatherWidget = () => {
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '4387022fe20300335656359a13903a56',
    lat: '53.350140',
    lon: '-6.266155',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });

  const customStyles = {
	fontFamily:  'Helvetica, sans-serif',
	gradientStart:  '#0181C2',
	gradientMid:  '#04A7F9',
	gradientEnd:  '#4BC4F7',
	locationFontColor:  '#FFF',
	todayTempFontColor:  '#FFF',
	todayDateFontColor:  '#B5DEF4',
	todayRangeFontColor:  '#B5DEF4',
	todayDescFontColor:  '#B5DEF4',
	todayInfoFontColor:  '#B5DEF4',
	todayIconColor:  '#FFF',
	forecastBackgroundColor:  '#FFF',
	forecastSeparatorColor:  '#DDD',
	forecastDateColor:  '#777',
	forecastDescColor:  '#777',
	forecastRangeColor:  '#777',
	forecastIconColor:  '#4BC4F7',
};

  return (
    <div className="w-full flex flex-col items-center space-y-8 sm:items-end p-2">
        <div className="max-w-sm mx-auto w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="p-2">
                <ReactWeather
                    isLoading={isLoading}
                    errorMessage={errorMessage}
                    data={data}
                    lang="en"
                    locationLabel="Dublin"
                    unitsLabels={{ temperature: '°C', windSpeed: 'Km/h' }}
                    showForecast
                    theme={customStyles}  
                    />
            </div>
        </div>
    </div>
  );
};

export default WeatherWidget;