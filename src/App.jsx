
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MainUserPage from "./pages/MainUserPage/MainUserPage";
import HomePage from "./pages/HomePage/HomePage";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/404" element={<NotFoundPage />} />

        <Route
          path="/main"
          element={
            <PrivateRoute>
              <MainUserPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
