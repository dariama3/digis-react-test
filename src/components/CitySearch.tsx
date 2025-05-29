import React, {useState, FormEvent} from 'react';
import { useDispatch } from 'react-redux'
import {fetchWeatherByCity} from '../store/slices/weatherSlice'
import { AppDispatch } from '../store'

function CitySearch() {
    const [city, setCity] = useState('');
    const [errorMessage, showErrorMessage] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = (e: FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        if (!city.trim()) {
            showErrorMessage(true)
        } else {
            dispatch(fetchWeatherByCity(city.trim()))
            showErrorMessage(false)
        }
    }
    return (
        <div className='wrapper'>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={city} aria-label="City search"
                placeholder="Search for a city" onChange={(e) => setCity(e.target.value)} style={{
                    border: errorMessage ? '1px solid red' : undefined
                }}
                />
                <button type={"submit"}>Search</button>
            </form>
            { errorMessage ? <p style={{color:'red'}}>Enter a valid city name</p> : <p>Enter a city name</p> }
        </div>
    )
}

export default CitySearch;
