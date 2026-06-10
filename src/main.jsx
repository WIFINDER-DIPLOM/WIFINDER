import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import MainUserPage from "./pages/MainUserPage/MainUserPage";
import MessengerPage from "./pages/MessangerPage/MessengerPage";
import HomePage from "./pages/HomePage/HomePage";
import DocumentsPage from "./pages/DocumentsPage/DocumentsPage";

import "./index.css";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/messenger" element={<MessengerPage />} />
        <Route path="/messenger/:chatId" element={<MessengerPage />} />
        <Route path="/documents" element={<DocumentsPage />} />

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
    </HashRouter>
  </StrictMode>,
);