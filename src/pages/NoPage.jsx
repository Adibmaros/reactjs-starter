// pages/NoPage.jsx
import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        <div className="text-8xl mb-8">🚫</div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go Back Home
          </Link>
          
          <div className="flex justify-center space-x-4 text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            <span className="text-gray-400">|</span>
            <Link to="/blogs" className="text-blue-600 hover:underline">Blogs</Link>
            <span className="text-gray-400">|</span>
            <Link to="/contact" className="text-blue-600 hover:underline">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}