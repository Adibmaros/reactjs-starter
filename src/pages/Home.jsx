// pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
        <p className="text-xl opacity-90">
          Discover amazing content and connect with us through our platform
        </p>
        <div className="mt-8">
          <Link 
            to="/blogs" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block mr-4"
          >
            Read Our Blogs
          </Link>
          <Link 
            to="/contact" 
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 text-3xl mb-4">📚</div>
          <h3 className="text-xl font-semibold mb-2">Rich Content</h3>
          <p className="text-gray-600">Explore our collection of insightful articles and blog posts.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 text-3xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold mb-2">Easy Contact</h3>
          <p className="text-gray-600">Get in touch with us through our simple contact form.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 text-3xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold mb-2">Fast & Responsive</h3>
          <p className="text-gray-600">Enjoy a smooth browsing experience across all devices.</p>
        </div>
      </div>
    </div>
  );
}