import React from 'react';
function CitySearch() {
    return (
        <div>
            <form>
                <input type={"text"} aria-label="City search"
                placeholder={"Search for a city"}/>
                <button type={"submit"}>Search</button>
            </form>
        </div>
    )
}

export default CitySearch;