import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotesPage from "./pages/notesPage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
