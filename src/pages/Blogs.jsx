// pages/Blogs.jsx
export default function Blogs() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React Router",
      excerpt: "Learn how to implement routing in your React applications with React Router.",
      date: "2025-07-01",
      author: "John Doe"
    },
    {
      id: 2,
      title: "Modern Web Development Trends",
      excerpt: "Explore the latest trends and technologies shaping the web development landscape.",
      date: "2025-06-28",
      author: "Jane Smith"
    },
    {
      id: 3,
      title: "Building Responsive Layouts",
      excerpt: "Master the art of creating responsive web layouts that work on all devices.",
      date: "2025-06-25",
      author: "Mike Johnson"
    }
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Blog</h1>
        <p className="text-xl text-gray-600">
          Stay updated with the latest insights and tutorials
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map(post => (
          <article key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              {post.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>
            <button className="mt-4 text-blue-600 hover:text-blue-800 font-medium">
              Read More →
            </button>
          </article>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Load More Posts
        </button>
      </div>
    </div>
  );
}