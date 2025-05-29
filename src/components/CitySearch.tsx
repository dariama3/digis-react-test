import React, { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherByCity } from "../store/slices/weatherSlice";
import { AppDispatch, RootState } from "../store";

function CitySearch() {
  const [city, setCity] = useState("");
  const [invalid, setInvalid] = useState(false);
  const { error } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!city.trim()) {
      setInvalid(true);
    } else {
      dispatch(fetchWeatherByCity(city.trim()));
      setInvalid(false);
    }
  };
  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          aria-label="City search"
          placeholder="Search for a city"
          onChange={(e) => setCity(e.target.value)}
          style={{
            border: invalid ? "1px solid red" : undefined,
          }}
        />
        <button type={"submit"}>Search</button>
      </form>
      {error ? <p>City not found</p> : ""}
    </div>
  );
}

export default CitySearch;
