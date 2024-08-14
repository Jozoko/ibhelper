import React, { useState } from 'react';
import axios from 'axios';

function RequestPage() {
  const [params, setParams] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/execute', {
        system: 'system-name',
        params,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error executing request:', error);
    }
  };

  return (
    <div>
      <h1>API Requests</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={params}
          onChange={(e) => setParams(e.target.value)}
          placeholder="Enter parameters"
        />
        <button type="submit">Execute</button>
      </form>
      {result && <div>{result}</div>}
    </div>
  );
}

export default RequestPage;
