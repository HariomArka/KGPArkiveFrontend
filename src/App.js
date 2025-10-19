import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import your components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import About from './Pages/About';
import Acads from './Pages/Acads';
import Questions from './Pages/Questions';
import Contact from './Pages/Contact';
import Login from './Pages/Login';
import Register from './Pages/Register';
import SubjectPageWrapper from './Pages/SubjectPageWrapper'; // New import
import SubmitQuestion from './Pages/SubmitQuestion';
import MyQuestions from './Pages/MyQuestions';
import Contri from './Pages/contri';

function App() {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/acads" element={<Acads />} />
            <Route path="/acads/:subject" element={<SubjectPageWrapper />} /> {/* New route */}
            <Route path="/questions" element={<Questions />} />
            <Route path="/myquestions" element={<MyQuestions />} />
            <Route path="/contribute" element={<Contri />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>}/>

            <Route path="/submit" element={<SubmitQuestion />} />

            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
    <ToastContainer position="top-center" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;