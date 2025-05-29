import React from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../store'

function CityChart() {
    const { data } = useSelector((state: RootState) => state.weather);

    if (!data || !data.length) {
        return null;
    }

    const chartData = data.map(item => ({
        date: item.date,
        temperature: item.temperature
    }));

    return (
        <div>{ JSON.stringify(chartData) }</div>
    );
}

export default CityChart;
