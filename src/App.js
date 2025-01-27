// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Learner/Header';
import HeroSection from './components/Learner/HeroSection';
import Solutions from './components/Learner/Cards';
import NextStep from './components/Learner/NextStep';
import Register from './components/Learner/Register';
import Footer from './components/Learner/Footer';
import Dashboard from './components/Learner/Dashboard';
import ApplicationProfile from './components/Learner/ApplicationProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <Solutions />
                <NextStep />
                <Register />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Dashboard/>
                <ApplicationProfile/>
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
