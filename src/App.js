// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Learner/Header';
import HeroSection from './components/Learner/LearnerPage/HeroSection';
import Solutions from './components/Learner/LearnerPage/Cards';
import NextStep from './components/Learner/LearnerPage/NextStep';
import Register from './components/Learner/LearnerPage/Register';
import Footer from './components/Learner/Footer';
import Dashboard from './components/Learner/LearnerDashboard/Dashboard';
import ApplicationProfile from './components/Learner/LearnerDashboard/ApplicationProfile';
import NewApllication from './components/Learner/LearnerDashboard/NewApplication';

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
          <Route
            path="/startnewapplication"
            element={
              <>
                <Dashboard/>
                <NewApllication/>
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
