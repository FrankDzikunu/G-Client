// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import Solutions from './components/Cards';
import NextStep from './components/NextStep';
import Register from './components/Register';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import ApplicationProfile from './components/ApplicationProfile';

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
