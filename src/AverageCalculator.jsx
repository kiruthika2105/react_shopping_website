import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:9876/numbers';

const AvgCalculator = () => {
    const [numberId, setNumberId] = useState('p');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const fetchNumbers = async () => {
        try {
            const response = await axios.get(`${API_URL}/${numberId}`);
            setData(response.data);
            setError('');
        } catch (err) {
            setError('Failed to fetch numbers');
            setData(null);
        }
    };

    return (
        <div>
            <h1>Average Calculator</h1>
            <div>
                <label htmlFor="numberId">Select Number ID: </label>
                <select id="numberId" value={numberId} onChange={(e) => setNumberId(e.target.value)}>
                    <option value="p">Prime</option>
                    <option value="f">Fibonacci</option>
                    <option value="e">Even</option>
                    <option value="r">Random</option>
                </select>
                <button onClick={fetchNumbers}>Fetch Numbers</button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && (
                <div>
                    <h2>Results</h2>
                    <p><strong>Previous State:</strong> {JSON.stringify(data.windowPrevState)}</p>
                    <p><strong>Current State:</strong> {JSON.stringify(data.windowCurrState)}</p>
                    <p><strong>Fetched Numbers:</strong> {JSON.stringify(data.numbers)}</p>
                    <p><strong>Average:</strong> {data.avg}</p>
                </div>
            )}
        </div>
    );
};

export default AvgCalculator;