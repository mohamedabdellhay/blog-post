import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = savedPosts.find((p) => p.id === id);
    if (foundPost) {
      setPost(foundPost);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="p-6">
        <p>المقال غير موجود.</p>
        <Link to="/posts" className="text-blue-600 underline">
          العودة إلى قائمة المقالات
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Helmet>
        <title>{post.title} | مدونتي</title>
        <meta name="description" content={post.content.slice(0, 150)} />
      </Helmet>
      <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 mb-4">📅 {post.date}</p>
        <hr className="mb-4" />
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="mt-6">
          <Link
            to="/posts"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ← العودة للمقالات
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PostView;
