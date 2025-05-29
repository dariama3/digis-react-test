import React from 'react';
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis} from "recharts";

function CityChart() {
    const { data } = useSelector((state: RootState) => state.weather);

    if (!data || !data.length) {
        return null;
    }

    return (
        <div className="temperature-chart">
            <h3>Temperature Forecast</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
                        <Bar
                            dataKey="temperature"
                            name="Temperature"
                            radius={[4, 4, 0, 0]}
                            fill="#ff9800"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default CityChart;
