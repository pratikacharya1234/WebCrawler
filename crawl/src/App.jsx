import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CrawlForm from "./Components/CrawlForm";
import './index.css';
function App() {
  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <CrawlForm />
      <ToastContainer position="top-center" />
    </div>
    </>
  );
}

export default App;
