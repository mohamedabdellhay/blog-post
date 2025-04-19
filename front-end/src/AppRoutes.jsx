import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PostsList from "./pages/PostsList";
import PostEditor from "./pages/PostEditor";
import ViewPost from "./pages/ViewPost";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./services/PrivateRoute";
import Header from "./components/Header";
import Trash from "./pages/Trash";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Dashboard />
              </>
            }
          />
          <Route
            path="/create"
            element={
              <>
                <Header />
                <PostEditor />
              </>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <>
                <Header />
                <PostEditor />
              </>
            }
          />
          <Route
            path="/trash"
            element={
              <>
                <Header />
                <Trash />
              </>
            }
          />
        </Route>
        <>
          <Route
            path="/posts"
            element={
              <>
                <Header />
                <PostsList />
              </>
            }
          />
          <Route
            path="/post/:id"
            element={
              <>
                <Header />
                <ViewPost />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      </Routes>
    </BrowserRouter>
  );
}
