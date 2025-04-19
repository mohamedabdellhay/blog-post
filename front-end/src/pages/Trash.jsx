import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Trash() {
  const [deletedPosts, setDeletedPosts] = useState([]);

  useEffect(() => {
    const fetchDeletedPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts/trash");
        const data = await res.json();
        setDeletedPosts(data);
      } catch (err) {
        console.error("Error fetching deleted posts:", err);
      }
    };

    fetchDeletedPosts();
  }, []);

  const handleRestore = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/restore/${id}`, {
        method: "POST",
      });
      if (res.ok) {
        setDeletedPosts(deletedPosts.filter((post) => post._id !== id));
      } else {
        console.error("Error restoring post:", res.statusText);
      }
    } catch (err) {
      console.error("Error restoring post:", err);
    }
  };

  return (
    <div style={{ direction: "rtl" }} className="p-6">
      <h1 className="text-2xl font-bold mb-4">🗑️ سلة المحذوفات</h1>
      <div>
        {deletedPosts.length > 0 ? (
          <ul className="space-y-4">
            {deletedPosts.map((post) => (
              <li key={post._id} className="bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-gray-500">{post.content}</p>
                <button
                  //   onClick={() => handleRestore(post._id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                  استعادة
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <>
            <p className="text-gray-500">لا توجد مقالات محذوفة.</p>
            <h2 className="text-lg font-semibold">معلومات إضافية</h2>
            <p className="text-gray-500">
              يمكنك استعادة المقالات المحذوفة من خلال الضغط على زر "استعادة"
              بجوار كل مقال.
            </p>
            <p className="text-gray-500">
              إذا كنت بحاجة إلى مساعدة، يرجى الاتصال بفريق الدعم.
            </p>
            <p className="text-gray-500">شكرًا لاستخدامك موقعنا!</p>
          </>
        )}
      </div>
      <div className="mt-6">
        <p className="text-gray-500">
          تاريخ آخر تحديث: {new Date().toLocaleDateString("ar-EG")}
        </p>
        <p className="text-gray-500">
          عدد المقالات المحذوفة: {deletedPosts.length}
        </p>
      </div>
    </div>
  );
}
