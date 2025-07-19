// import { useState,useEffect } from 'react'
// //  import './App.css'
// import axios from 'axios';

// const App=()=>{
//   const [value,setValue]=useState('')  
//   const [country,setCountry]=useState([])
//   const [name,setName]=useState(null)

//   useEffect(()=>{
//     console.log('effect run, country is now ', name)
//     if(name){
//       console.log('Fetching country names...')

//       axios
//         .get(`https://restcountries.com/v3.1/name/${name}`)
//         .then(response=>{
//           console.log(response.data)
//           setCountry(response.data)

//         }) 
//     }
//   },[name])

//   // useEffect(()=>{
//   //   console.log('effect run, country is now ', name)
//   //   if(name){
//   //     console.log('Fetching country names...')

//   //     const fetchCountry= async ()=> {
//   //       try{
//   //         const url=`https://restcountries.com/v3.1/name/${name}`
//   //         const response=await axios.get(url)
//   //         console.log(response.data)
//   //         setCountry(response.data)
//   //       }catch{
//   //         console.error("Error fetching data: ", error.data)
//   //       }
//   //     } 
//   //     fetchCountry();
//   //   }
    
//   // },[name])



//   const handleChange=(event)=>{
//     setValue(event.target.value)
//   }

//   const onSearch=(event)=>{ 
//     event.preventDefault()
//     setName(value)
//   }
  
//   return (
//     <div>
//       <form onSubmit={onSearch}>
//         find countries <input value={value} onChange={handleChange} />
//       </form>
//       <p>{country.name}</p>
//     </div>
//   )
// }

// export default App


import { useState, useEffect } from 'react'
import axios from 'axios';

const App = () => {
  const [value, setValue] = useState('')  
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('effect run, search term is now:', value)
    
    if (value.trim() === '') {
      setCountries([])
      return
    }

    setLoading(true)
    setError(null)
    
    // Add a small delay to avoid too many API calls while typing
    const timeoutId = setTimeout(() => {
      console.log('Fetching countries...')
      
      axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then(response => {
          console.log('API response:', response.data)
          setCountries(response.data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching countries:', error)
          setError('No countries found')
          setCountries([])
          setLoading(false)
        })
    }, 300)

    // Cleanup function to cancel the timeout if value changes
    return () => clearTimeout(timeoutId)
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const showCountry = (country) => {
    setValue(country.name.common)
    setCountries([country])
  }

  const Weather = ({ capital }) => {
    const apiKey = import.meta.env.VITE_SOME_KEY
    const [weather, setWeather] = useState(null)
    const [weatherLoading, setWeatherLoading] = useState(false)
    const [weatherError, setWeatherError] = useState(null)

    useEffect(() => {
      if (!capital || !apiKey) {
        setWeatherError('Missing capital city or API key')
        return
      }

      setWeatherLoading(true)
      setWeatherError(null)

      // First get coordinates for the capital city
      axios
        .get(`https://api.openweathermap.org/geo/1.0/direct?q=${capital}&limit=1&appid=${apiKey}`)
        .then(response => {
          if (response.data.length === 0) {
            throw new Error('City not found')
          }
          
          const { lat, lon } = response.data[0]
          
          // Then get weather data using coordinates
          return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        })
        .then(response => {
          setWeather(response.data)
          setWeatherLoading(false)
        })
        .catch(error => {
          console.error('Error fetching weather:', error)
          setWeatherError('Failed to fetch weather data')
          setWeatherLoading(false)
        })
    }, [capital, apiKey])

    if (weatherLoading) return <p>Loading weather...</p>
    if (weatherError) return <p>{weatherError}</p>
    if (!weather) return <p>No weather data available</p>

    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p><b>Temperature: </b>{Math.round(weather.main.temp)} °C</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        {/* <p><b>Description: </b>{weather.weather[0].description}</p> */}
        <p><b>Wind speed: </b>{weather.wind.speed} m/s</p>
      </div>
    )
  }

  const renderCountries = () => {
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (countries.length === 0) return null

    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (countries.length > 1) {
      return (
        <div>
          {countries.map(country => (
            <div key={country.cca3}>
              {country.name.common} 
              <button onClick={() => showCountry(country)}>show</button>
            </div>
          ))}
        </div>
      )
    }

    // Single country - show detailed view
    const country = countries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Area: {country.area.toLocaleString()} km²</p>
        
        <h3>Languages:</h3>
        <ul>
          {country.languages ? 
            Object.values(country.languages).map(lang => (
              <li key={lang}>{lang}</li>
            )) : 
            <li>No languages listed</li>
          }
        </ul>
        
        <div>
          <img 
            src={country.flags.png} 
            alt={`Flag of ${country.name.common}`}
            style={{ width: '200px', border: '1px solid #ccc' }}
          />
        </div>
        
        <Weather capital={country.capital ? country.capital[0] : null} />
      </div>
    )
  }

  return (
    <div>
      <div>
        find countries <input value={value} onChange={handleChange} />
      </div>
      {renderCountries()}
    </div>
  )
}

export default App