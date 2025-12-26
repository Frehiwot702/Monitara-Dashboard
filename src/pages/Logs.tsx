import React, { useEffect, useState } from 'react'
import LogList from '../components/LogList';

const Logs = () => {
    const [logs, setLogs] = useState<[]>([]);
      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const fetchLogs = async () => {
          try {
            const res = await fetch('http://localhost:4000/logs');
            const data = await res.json();
            console.log('data: ', data)
            setLogs(data.reverse()); // Newest first
          } catch (error) {
            console.error('Failed to load logs', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchLogs();
    
        // Refresh every 5 seconds
        const interval = setInterval(fetchLogs, 5000);
        return () => clearInterval(interval);
      }, []);

    const handleCode = () => {
      
    }

  return (
    <div className='bg-gradient-to-br from-blue-700 to-green-400 p-5 md:p-10 min-h-screen' style={{ fontFamily: 'Arial, sans-serif'}}>
        <div className='p-8 md:p-10 rounded-xl space-y-10 bg-white min-h-screen'>
        <div className='w-full flex justify-between'>
          <div className='space-y-2'>
              <h1 className='text-2xl md:text-3xl font-bold'>📊 Integration Logs</h1>
              <p className='text-gray-500 text-sm'>Live log viewer for Dashen Bank SuperApp integration. Tracks customer identifiers, payment responses, and errors to ensure smooth transaction flow and simplify troubleshooting.</p>
          </div>
          <div>
            <h3>Enter code</h3>
            <input type='number' onChange={handleCode}/>
          </div>
        </div>
        {loading ? <p className='text-center text-gray-500 animate-pulse'>Loading logs...</p> : <LogList logs={logs} />}
        </div>
    </div>
  )
}

export default Logs