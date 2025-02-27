import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import History from "./History"; 

const CrawlForm = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("crawlHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const handleCrawl = async () => {
    if (!url) {
      toast.error("Please enter a URL!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/crawl", { url });
      setResult(response.data);
      toast.success("Crawling successful!");

      const newEntry = { url, ...response.data };
      const updatedHistory = [newEntry, ...history].slice(0, 5);
      setHistory(updatedHistory);
      localStorage.setItem("crawlHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      toast.error("Failed to crawl website.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-center">🔍 Web Crawler</h2>

      <div className="relative w-full">
        <input
          type="text"
          placeholder="Enter website URL..."
          className="w-full bg-gray-800 text-white p-5 rounded-2xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleCrawl}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 px-5 py-3 rounded-lg text-white hover:bg-blue-600 transition text-lg"
        >
          Crawl
        </button>
      </div>

      {result && (
        <div className="mt-8 bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-md">
          <h3 className="text-xl font-semibold text-blue-400">📋 Results:</h3>
          <p className="text-gray-300 mt-3"><strong className="text-white">Title:</strong> {result.title}</p>
          <p className="text-gray-300 mt-3"><strong className="text-white">Summary:</strong> {result.summary}</p>
          <p className="text-gray-300 mt-3"><strong className="text-white">Technologies Used:</strong> {result.technologies.join(", ") || "Unknown"}</p>

          <button
            className="mt-6 px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-lg"
            onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}
          >
            📋 Copy Result
          </button>
        </div>
      )}

      {/* History Component */}
      <History history={history} setHistory={setHistory} />
    </div>
  );
};

export default CrawlForm;
