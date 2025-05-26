import React, { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  let APIKEY = `ed4edd3ff1aa8aafd4a9d6acf1f2bb96`

  const [cityName , setCityName] = useState("karachi")
  const [apiResponse , setApiResponse] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}&units=metric`
      )
      console.log("response of data", response.data)
      setApiResponse(response.data)
    } catch (error) {
      alert("Error: " + error.message)
    }
  }

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    fetchData()
  }

  return (
<div className="container">
      <div className="weather-box">
        <h2>🌤️ Weather App</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter City Name..."
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button type="submit">Check</button>
        </form>

        {apiResponse && (
          <div className="weather-info">
            <h3>{new Date().toDateString()}</h3>
            <h3>City: {apiResponse.name}</h3>
            <h3>Temp: {apiResponse.main.temp}°C</h3>
            <img
              src={`https://openweathermap.org/img/w/${apiResponse.weather[0].icon}.png`}
              alt={apiResponse.weather[0].description}
            />
            <p>{apiResponse.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
