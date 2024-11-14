import React, { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:5000/api'
  : import.meta.env.VITE_BACKEND_URL;

const AccessLogForm = ({ onDataUpdate }) => {
    const [formData, setFormData] = useState({
        accessTime: '',
        accessDate: '',
        employeeName: '',
        algoStatus: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('${API_URL}/log-access', formData);

            const response = await axios.post('${API_URL}/filtered-data', {
                algoStatus: 1
            });

            if (onDataUpdate) {
                onDataUpdate(response.data);
            }

            setFormData({
                accessTime: '',
                accessDate: '',
                employeeName: '',
                algoStatus: ''
            });

            alert('Access log submitted successfully!');
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Chart Access Log</h2>
            </div>
            <div className="p-6">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="accessTime" className="text-sm font-medium text-gray-700">
                                Access Time
                            </label>
                            <input
                                type="time"
                                id="accessTime"
                                name="accessTime"
                                value={formData.accessTime}
                                onChange={handleInputChange}
                                required
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="accessDate" className="text-sm font-medium text-gray-700">
                                Access Date
                            </label>
                            <input
                                type="date"
                                id="accessDate"
                                name="accessDate"
                                value={formData.accessDate}
                                onChange={handleInputChange}
                                required
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="employeeName" className="text-sm font-medium text-gray-700">
                                Employee Name
                            </label>
                            <input
                                type="text"
                                id="employeeName"
                                name="employeeName"
                                value={formData.employeeName}
                                onChange={handleInputChange}
                                required
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex flex-col space-y-2">
                            <label htmlFor="algoStatus" className="text-sm font-medium text-gray-700">
                                Energy Saving Mode
                            </label>
                            <select
                                id="algoStatus"
                                name="algoStatus"
                                value={formData.algoStatus}
                                onChange={handleInputChange}
                                required
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Select mode</option>
                                <option value="ON">ON</option>
                                <option value="OFF">OFF</option>
                            </select>
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AccessLogForm;
