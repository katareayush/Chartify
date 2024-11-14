import React from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const chartComponents = {
    bar: Bar,
    line: Line,
};

const CustomChart = ({ type = 'bar', data, options }) => {
    // Check if data is provided and has necessary properties
    if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
        console.warn('CustomChart: Invalid data prop. Make sure "data" includes "labels" and "datasets" properties.');
        return null;
    }

    const ChartComponent = chartComponents[type] || Bar;
    return <ChartComponent data={data} options={options} />;
};

export default CustomChart;
