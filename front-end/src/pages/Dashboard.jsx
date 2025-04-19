import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Dashboard() {
  const [homePageContent, setHomePageContent] = useState([]);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/home");
        const data = await res.json();
        setHomePageContent(data);
      } catch (err) {
        console.error("Error fetching home page content:", err);
      }
    };

    fetchHomePage();
  }, []);

  const recentPosts = homePageContent.recentPosts || [];
  const posts = homePageContent.numberOfArticles;
  return (
    <div className="min-h-screen bg-gray-100 p-6" style={{ direction: "rtl" }}>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📊 لوحة التحكم</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">عدد المقالات</h2>
            <p className="text-2xl mt-2">{posts}</p>
          </div>

          <Link
            to="/create"
            className="bg-blue-600 text-white p-4 rounded shadow hover:bg-blue-700 flex items-center justify-center"
          >
            ✍️ إنشاء مقال جديد
          </Link>

          <Link
            to="/posts"
            className="bg-gray-800 text-white p-4 rounded shadow hover:bg-gray-900 flex items-center justify-center"
          >
            📚 إدارة المقالات
          </Link>
          <Link
            to="/trash"
            className="bg-gray-800 text-white p-4 rounded shadow hover:bg-gray-900 flex items-center justify-center"
          >
            🗑️ سلة المحذوفات
          </Link>
        </div>

        <div
          className="bg-white p-6 rounded shadow"
          style={{ direction: "rtl" }}
        >
          <h2 className="text-xl font-semibold mb-4">🕒 أحدث المقالات</h2>
          {recentPosts.length === 0 ? (
            <p className="text-gray-500">لا يوجد مقالات بعد.</p>
          ) : (
            <ul className="space-y-4">
              {recentPosts.map((post) => (
                <li key={post.id} className="border-b pb-2">
                  <Link
                    to={`/edit/${post.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    📅تاريخ إنشاء المقال{" "}
                    {new Date(post.createdAt).toLocaleString("ar-EG", options)}
                  </p>
                  <p className="text-sm text-gray-500">
                    📅أخر تحديث:{" "}
                    {new Date(post.createdAt).toLocaleString("ar-EG", options)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
