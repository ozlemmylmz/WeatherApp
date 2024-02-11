
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setweatherData] = useState(null);
  const [location, setLocation] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=29a2ce6c18ae4d39a10115809231012&q=${location}&days=3&aqi=yes&alerts=yes`)
        setweatherData(response.data)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    };
    if (location) {
      fetchData();
    }
  }, [location])

  const handleLocationChange = (event) => {
    setLocation(event.target.value)
  }
  return (
    <div className='appContainer'>
      <h1 className='appTitle'>Hava Durumu Uygulaması</h1>
      <div className='inputContainer'>
        <input
          className='locationInput'
          type="text"
          placeholder="Şehir giriniz"
          value={location}
          onChange={handleLocationChange}
        />
      </div>
      {weatherData &&
        <div className='weatherContainer'>
          {weatherData.forecast.forecastday?.map((day) => (
            <div className='dayContainer' key={day.date}>
              <h2 className='date'>{day.date}</h2>
              <img className='weatherIcon' src={day.day.condition.icon} alt={day.day.condition.text} />
              <p className='temperature'>{day.day.avgtemp_c} °C </p>
            </div>
          ))}
        </div>
      }

    </div>
  );
}

export default App;
