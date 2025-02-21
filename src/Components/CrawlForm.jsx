import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CrawlForm = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);

  const handleCrawl = async () => {
    if (!url) {
      toast.error("Please enter a URL!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/crawl", { url });
      setResult(response.data);
      toast.success("Crawling successful!");
    } catch (error) {
      toast.error("Failed to crawl website.");
    }
  };

  return (
    <div className="max-w-50rem mx-auto mt-12 p-8 bg-gray-900 text-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6">Web Crawler</h2>

      {/* Input Box */}
      <div className="relative w-full flex items-center">
        <input
          type="text"
          placeholder="Enter website URL..."
          className="flex-grow bg-gray-800 text-white p-5 rounded-2xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ height: '50px' }} // Increase height
        />
        {url && (
          <button
            onClick={handleCrawl}
            className="ml-4 bg-blue-500 px-5 py-3 rounded-lg text-white hover:bg-blue-600 transition text-lg"
          >
            Crawl
          </button>
        )}
      </div>

      {/* Results Display */}
      {result && (
        <div className="mt-8 bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-md">
          <h3 className="text-xl font-semibold text-blue-400">Results:</h3>
          <p className="text-gray-300 mt-3"><strong className="text-white">Title:</strong> {result.title}</p>
          <p className="text-gray-300 mt-3"><strong className="text-white">Summary:</strong> {result.summary}</p>
          <p className="text-gray-300 mt-3"><strong className="text-white">Technologies Used:</strong> {result.technologies.join(", ") || "Unknown"}</p>

          {/* Copy Button */}
          <button
            className="mt-6 px-5 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-lg"
            onClick={() => navigator.clipboard.writeText(JSON.stringify(result, null, 2))}
          >
            Copy Result
          </button>
        </div>
      )}
    </div>
  );
};

export default CrawlForm;
