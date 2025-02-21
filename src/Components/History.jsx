import React from 'react'


    const History = ({ history, setHistory }) => {
        const handleDelete = (index) => {
          const newHistory = history.filter((_, i) => i !== index);
          setHistory(newHistory);
          localStorage.setItem("crawlHistory", JSON.stringify(newHistory));
        };
      
        return (
          history.length > 0 && (
            <div className="mt-10 bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-md">
              <h3 className="text-xl font-semibold text-yellow-400">📜 Crawl History</h3>
              <ul className="mt-3 space-y-3">
                {history.map((entry, index) => (
                  <li key={index} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="text-blue-300 font-semibold">{entry.url}</p>
                      <p className="text-gray-300 text-sm">{entry.title}</p>
                    </div>
                    <button
                      className="text-red-400 hover:text-red-600 transition"
                      onClick={() => handleDelete(index)}
                    >
                      ❌ Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        );
      };
      

export default History