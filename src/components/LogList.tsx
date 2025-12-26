// src/components/LogList.tsx
import { format } from 'date-fns';
import { useState } from 'react';

type Log = {
  id: number;
  type: string;
  data: string;
  timestamp: string;
  url: string;
};

export default function LogList({ logs }: { logs: Log[] }) {

    const[currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 10;

    const totalPages = Math.ceil(logs.length / logsPerPage);
    const startIndex = (currentPage - 1) * logsPerPage;
    const paginatedLogs = logs.slice(startIndex, startIndex + logsPerPage)


    // handle Page change 
    const goToNextPage = () => {
        if(currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    const goToPrevPage = () => {
        if(currentPage > 1) setCurrentPage(currentPage - 1);
    }

  return (
    <div className='h-full border border-white p-5 rounded-sm'>
      {logs.length === 0 ? (
        <p className='text-gray-400 text-center'>No logs yet.</p>
      ) : (
        // <table style={{ width: '100%' }} className='rounded-lg'>
        //   <thead className='py-2 bg-gray-100 rounded-4xl text-gray-600 text-sm md:text-md' >
        //     <tr className=''>
        //       <th className='py-2 rounded-tl-2xl'>Time</th>
        //       <th>Type of Action</th>
        //       <th>Data (if any)</th>
        //       <th className='rounded-tr-2xl'>Page</th>
        //     </tr>
        //   </thead>
        //   <tbody className='text-sm h-screen'>
        //     {paginatedLogs.map((log) => (
        //       <tr key={log.id} style={{ borderBottom: '1px solid #ddd' }} className='max-h-10 overflow-y-auto scrollbar-hide'>
        //         <td style={{ padding: '8px' }}>
        //           {format(new Date(log.timestamp), 'HH:mm:ss')}
        //         </td>
        //         <td style={{ padding: '8px' }} className='max-w-10'>
        //           <strong className='text-white py-1 px-3 rounded-full' style={{
        //             color: log.type.includes('error') || log.type.includes('not')  ? 'red' :
        //                    log.type.includes('success') ? 'green' :
        //                    log.type.includes('payment') ? 'blue' : 'black'
        //           }}>
        //             {log.type}
        //           </strong>
        //         </td>
        //         <td style={{ padding: '8px', fontSize: '12px' }} className='max-w-62 overflow-y-scroll overflow-x-scroll'>
        //           <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
        //             {JSON.stringify(log.data, null, 2)}
        //           </pre>
        //         </td>
        //         <td style={{ padding: '8px', fontSize: '12px' }}>
        //           {new URL(log.url).pathname}
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
        <div>
          {paginatedLogs.map((log) => (
              <div key={log.id} className=' w-full flex space-x-5 space-y-2 scrollbar-hide'>
                <h3 className='w-fit text-[#f1cfd7]'>
                  {format(new Date(log.timestamp), 'HH:mm:ss')}
                </h3>
                <h3 className='w-fit'>
                  {log.type}
                </h3>
                <div className='relative' style={{
                    color: log.type.includes('error') || log.type.includes('not')  ? '#FF6B6B' :
                           log.type.includes('success') ? '#367588' :
                           log.type.includes('payment') ? '#60A5FA' : 'white'
                  }}>
                  <pre >
                    {JSON.stringify(log.data, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Pagination control */}
      <div className='w-full text-center space-x-10 py-10 text-sm'>
        <button 
            style={{
                backgroundColor: currentPage === 1 ? '#ddd' : '#F2B5C4',
                color: 'black',  
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            }}
            onClick={goToPrevPage} 
            disabled={currentPage === 1}
            className={` px-5 py-2 rounded-md`}>Previous</button>

        <span>Page {currentPage} of {totalPages || 1}</span>

        <button
            style={{
                backgroundColor: currentPage === totalPages ? '#ddd' : '#F2B5C4',
                color: 'black',  
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            }}
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className='bg-gray-500 px-5 py-2 rounded-md '>Next</button>
      </div>
    </div>
  );
}