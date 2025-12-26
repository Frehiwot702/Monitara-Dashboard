// src/App.tsx

import { useEffect, useState } from 'react';
import LogList from './components/LogList';
import './index.css';
import HowTo from './components/HowTo';

export default function App() {
  const [logs, setLogs] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [openHowTo, setOpenHowTo] = useState(false)

  useEffect(() => {
    if (!code) return;
    const fetchLogs = async () => {
      try {
        const res = await fetch('https://monitara-server.onrender.com/logs', {
          headers: { 
            'Content-Type': 'application/json', 
            // 'x-api-key': process.env.NEXT_PUBLIC_LOG_API_KEY  || 'monitara_prod_9fA2Kx!',
            'x-api-key': 'monitara_prod_9fA2Kx!',
            'x-project-code': code,
          }
        });
        const data = await res.json();
        console.log('data: ', data)
        setLogs(data.reverse()); // Newest first
      } catch (error) {
        console.error('Failed to load logs', error);
        setError('Failed to load logs');
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();

    // Refresh every 5 seconds
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, [code]);

  const handleClear = async () => {
    if (!code) return;
    try {
      const res = await fetch('https://monitara-server.onrender.com/logs', {
        method: 'DELETE',
        headers: {
          'x-project-code': code,
        },
      });
      if (!res.ok) throw new Error('Failed to clear logs');
      alert('Logs cleared');
    } catch (error) {
      console.error('Failed to clear logs', error);
      alert('Failed to clear logs');
      setError('Failed to clear logs');
    }

  }

  const fetchLogs = async () => {
    if (!code) return;

    setLoading(true);
    try {
      const res = await fetch('https://monitara-server.onrender.com/logs', {
        headers: { 
          'Content-Type': 'application/json', 
          'x-project-code': code,
        }
      });
      const data = await res.json();
      setLogs(data.reverse());
    } catch (error) {
      console.error(error);
      setError('Failed to load logs');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenHowTo = () => {
    setOpenHowTo(!openHowTo);
    console.log('how to opened: ', openHowTo)
  }

  
  return (
    <div className='relative bg-[#212121] text-white' style={{ fontFamily: 'Arial, sans-serif'}}>
      <div className='w-full text-end flex justify-end items-center space-x-5 px-10 pt-5'>
        <button 
          onClick={fetchLogs}
          className='hover:[#F2B5C4] cursor-pointer border-none'>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 16 16"><path fill="#ffffff" d="M6.12.146a.5.5 0 1 1 .708.708l-2.15 2.15h3.29c1.16 0 2.3.339 3.28.974s1.74 1.54 2.21 2.61a6.01 6.01 0 0 1-1.059 6.47a6.02 6.02 0 0 1-6.35 1.638c-1.1-.371-2.07-1.05-2.79-1.97s-1.16-2.02-1.27-3.17a.5.5 0 0 1 .996-.09a5 5 0 0 0 1.06 2.65a5.002 5.002 0 1 0 6.66-7.289a5 5 0 0 0-2.73-.812h-3.29l2.15 2.15q.07.07.11.162c.04.092.037.126.037.192a.5.5 0 0 1-.309.463a.5.5 0 0 1-.546-.109l-3-3a.5.5 0 0 1-.147-.354a.5.5 0 0 1 .147-.354l3-3z"/></svg>
        </button>
        <button
          onClick={handleClear} 
          className='hover:[#F2B5C4] cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 1025 1024"><path fill="#ffffff" d="M960.865 192h-896q-26 0-45-18.5t-19-45t18.5-45.5t45.5-19h320q0-26 18.5-45t45.5-19h128q27 0 45.5 19t18.5 45h320q26 0 45 19t19 45.5t-19 45t-45 18.5zm0 704q0 53-37.5 90.5t-90.5 37.5h-640q-53 0-90.5-37.5t-37.5-90.5V256h896v640zm-640-448q0-26-19-45t-45.5-19t-45 19t-18.5 45v384q0 27 18.5 45.5t45 18.5t45.5-18.5t19-45.5V448zm256 0q0-26-19-45t-45.5-19t-45 19t-18.5 45v384q0 27 18.5 45.5t45 18.5t45.5-18.5t19-45.5V448zm256 0q0-26-19-45t-45.5-19t-45 19t-18.5 45v384q0 27 18.5 45.5t45 18.5t45.5-18.5t19-45.5V448z"/></svg>
        </button>
        <button
          onClick={handleOpenHowTo}
          className='hover:[#F2B5C4] cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill="#ffffff" d="M8 15c-3.86 0-7-3.14-7-7s3.14-7 7-7s7 3.14 7 7s-3.14 7-7 7ZM8 2C4.69 2 2 4.69 2 8s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6Z"/><circle cx="8" cy="6" r=".75" fill="#FFFFFF"/><path fill="#ffffff" d="M8 12c-.28 0-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5s.5.22.5.5v3c0 .28-.22.5-.5.5Z"/></svg>
        </button>
        <div className=''>
          <input 
            type='text' 
            value={code}
            onChange={(e) => setCode(e.target.value.trim())}
            placeholder='Enter code'
            className='border border-[#F2B5C4] text-sm rounded-md px-2 py-2 w-32'
          />
        </div>
      </div>
      <div className='px-8 rounded-xl min-h-screen'>
        <div className='w-full flex justify-between items-center pb-4'>
          <div className='space-y-2 pb-5'>
              <h1 className='text-2xl text-[#F2B5C4] md:text-4xl font-bold font-bartle'>Monitara</h1>
              <p className='text-white/80 text-sm font-light'>Monitara is a real-time log monitoring dashboard designed to help you track system events, errors, payment responses, and user activities. By entering your project code, you can securely view and manage logs for your project, making it easy to troubleshoot issues, monitor performance, and ensure smooth operations.</p>
          </div>
          {/* <div className='w-1/2 flex flex-col justify-end space-x-3 items-end'>
            
            
          </div> */}
        </div>
        {!code && <p className='text-center text-gray-500'>Enter your project code to view logs</p>}
        {code && (loading ? <p className='text-center text-gray-500 animate-pulse'>Loading logs...</p> : <LogList logs={logs} />)}
      </div>

      {
        openHowTo && (
          <HowTo/>
        )
      }
      {/* <HowTo/> */}
    </div>
  );
}