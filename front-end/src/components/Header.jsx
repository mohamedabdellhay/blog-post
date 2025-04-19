import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        My Blog Admin
      </Link>

      <div className="flex items-center gap-4">
        {user && <span className="text-sm">Welcome, {user}</span>}

        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="underline">
              Login
            </Link>
            <Link to="/register" className="underline">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
