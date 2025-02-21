🔍 Web Crawler


A simple web crawler built using React.js, TailwindCSS, and Selenium. Users can enter a website URL, click Crawl, and get a summary of the website, including the title, description, and technologies used. The app also stores crawl history using localStorage.

🚀 Features
✅ Enter a website URL and crawl it for details
✅ Displays title, summary, and technologies used
✅ Copy results to clipboard with one click
✅ Crawl History – View and delete past crawled websites
✅ LocalStorage Support – Saves history even after page refresh
✅ Modern UI – Styled with TailwindCSS

🛠️ Technologies Used
Frontend:
⚛️ React.js – UI framework
🎨 TailwindCSS – Styling
🔥 Toastify – Notifications
Backend (Crawler):
🕷️ Selenium – Automates browser for crawling
🚀 Express.js – API to communicate with React
🏬 LocalStorage – Stores user history
📦 Installation & Setup
1️⃣ Clone the repository
sh
Copy
Edit
git clone https://github.com/your-username/web-crawler.git
cd web-crawler
2️⃣ Install dependencies
sh
Copy
Edit
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
3️⃣ Start the backend server
sh
Copy
Edit
cd backend
node server.js
4️⃣ Start the frontend
sh
Copy
Edit
cd frontend
npm start
The app should now be running at http://localhost:3000 🚀

📌 Usage
1️⃣ Enter a website URL in the input field
2️⃣ Click Crawl to fetch details
3️⃣ View title, summary, and technologies used
4️⃣ Copy the result if needed
5️⃣ View previous crawled sites in History

📷 Screenshots
🔹 Main UI
🔹 Crawl History Section
(You can add screenshots here)

🎯 Future Improvements
🚀 Add pagination for history
🚀 Implement dark mode toggle
🚀 Allow exporting results as JSON

🤝 Contributing
Feel free to fork this repo and submit pull requests!

📜 License
MIT License 📄
