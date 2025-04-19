import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("حدث خطأ أثناء تحميل المقالات:", error);
      }
    }

    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📝 قائمة المقالات</h1>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + مقال جديد
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-gray-500">لا يوجد مقالات بعد.</p>
        ) : (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post._id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{post.title}</h2>
                  <p className="text-sm text-gray-500">
                    📅 {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <Link
                    to={`/post/${post.slug}`}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    عرض
                  </Link>
                  <Link
                    to={`/edit/${post._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    تعديل
                  </Link>

                  <button
                    onClick={async () => {
                      try {
                        await axios.delete(
                          `http://localhost:5000/api/posts/move-to-trash/${post.id}`
                        );
                        setPosts(posts.filter((p) => p.id !== post.id));
                      } catch (error) {
                        console.error("حدث خطأ أثناء حذف المقال:", error);
                      }
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    حذف
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PostsList;
