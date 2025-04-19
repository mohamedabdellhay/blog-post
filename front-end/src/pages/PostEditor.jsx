import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function PostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [tags, setTags] = useState([]);
  const author = localStorage.getItem("user");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/posts/${id}`
          );
          console.log(response);
          const post = response.data;

          if (post) {
            setTitle(post.title);
            setSlug(post.slug);
            setMetaDescription(post.meta_description);
            setContent(post.content);
            setDate(post.date);
            setTags(post.tags);
            setStatus(post.status);
          }
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      } else {
        setDate("now");
        setStatus("draft");
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      id: id || uuidv4(),
      title,
      slug,
      meta_description: metaDescription,
      content,
      tags,
      author,
    };

    if (id) {
      try {
        console.log(newPost);
        await axios.put(`http://localhost:5000/api/posts/${id}`, newPost);
        toast.success("تم تحديث المقال!");
      } catch (err) {
        alert("error ", err);
      }
    } else {
      try {
        console.log(newPost);

        await axios.post(`http://localhost:5000/api/posts`, newPost);
        toast.success("تم إنشاء المقال!");
      } catch (err) {
        alert("error: ", err);
      }
    }

    navigate("/posts");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
        <h1 className="text-2xl font-bold mb-4">
          {id ? "تعديل المقال" : "مقال جديد"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="عنوان المقال"
            value={title}
            onChange={(e) => {
              const titleValue = e.target.value;
              setTitle(titleValue);
              setSlug(titleValue.toLowerCase().replace(/\s+/g, "-"));
            }}
            required
            className="w-full p-2 border rounded"
          />

          <input
            type="text"
            placeholder="meta description"
            value={metaDescription}
            onChange={(e) => {
              setMetaDescription(e.target.value);
            }}
            required
            className="w-full p-2 border rounded"
          />

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="bg-white"
          />

          {/* <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded"
          /> */}
          <p>Post Date: {date}</p>

          <input
            type="text"
            placeholder="tags "
            value={tags}
            onChange={(e) => {
              setTags(e.target.value);
            }}
            required
            className="w-full p-2 border rounded"
          />
          <p>Post Status: {status}</p>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {id ? "تحديث" : "حفظ"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostEditor;
