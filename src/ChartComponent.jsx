import React, { useEffect, useState } from 'react';
import CustomChart from './CustomChart';
import 'chart.js/auto';
import axios from 'axios';

const ChartComponent = () => {
    const [originalData, setOriginalData] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Energy Consumption (kWh)',
            data: [],
            backgroundColor: 'rgba(75,192,192,0.6)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
        }],
    });
    const [chartType, setChartType] = useState('bar');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/data')
            .then(response => {
                console.log(response.data);  
                setOriginalData(response.data);
                updateChartData(response.data);
            })
            .catch(error => {
                console.error('Error fetching local data:', error);
            });
    }, []);
    

    const updateChartData = (data) => {
        const dates = data.map(entry => new Date(entry.createdAt).toLocaleDateString());
        const energyConsumption = data.map(entry => entry.total_kwh);
        setChartData({
            labels: dates,
            datasets: [{
                label: 'Energy Consumption (kWh)',
                data: energyConsumption,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            }],
        });
    };

    const handleFilter = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
    
        if (start > end) {
            alert('Start date cannot be later than end date');
            return;
        }
    
        const filteredData = originalData.filter(entry => {
            const entryDate = new Date(entry.createdAt);
            return entryDate >= start && entryDate <= end;
        });
    
        updateChartData(filteredData);
    };
    

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-[52px] font-bold text-gray-800 mb-4 flex justify-center">Energy Consumption Over Time</h2>
            
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <label className="flex flex-col text-sm text-gray-600">
                    Start Date
                    <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </label>
                
                <label className="flex flex-col text-sm text-gray-600">
                    End Date
                    <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </label>
                
                <button 
                    onClick={handleFilter} 
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md translate-y-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Filter
                </button>
                
                <label className="flex flex-col text-sm text-gray-600">
                    Chart Type
                    <select 
                        value={chartType} 
                        onChange={(e) => setChartType(e.target.value)}
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="bar">Bar</option>
                        <option value="line">Line</option>
                    </select>
                </label>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
                <CustomChart
                    type={chartType}
                    data={chartData}
                    options={{
                        responsive: true,
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Energy Comsumption (in kWh)'
                                },
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default ChartComponent;
