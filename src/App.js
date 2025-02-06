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
import AdminDashboard from './components/Admin/pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';
import AdminInvoices from './components/Admin/pages/AdminInvoices';
import AdminCreateCourses from './components/Admin/pages/AdminCreateCourses';
import AdminCourses from './components/Admin/pages/AdminCourses';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/admin" element={
          <AdminRoute>
          <AdminDashboard />
          </AdminRoute>} />
        
        <Route path="/admin/invoices" element={
          <AdminRoute>
          <AdminInvoices />
          </AdminRoute>
        } />

        <Route path="/admin/create-courses" element={
          <AdminRoute>
          <AdminCreateCourses />
          </AdminRoute>
        } />
          
          <Route path="/admin/courses" element={
          <AdminRoute>
          <AdminCourses />
          </AdminRoute>
        } />

          <Route
            path="/"
            element={

              <>
                 <Header />
                <HeroSection />
                <Solutions />
                <NextStep />
                <Register />
                <Footer />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={
              <>
              <UserRoute>
                <Header />
                <Dashboard/>
                <ApplicationProfile/>
                <Footer />
              </UserRoute>
              </>
            }
          />
          <Route
            path="/startnewapplication"
            element={
              <>
              <UserRoute>
                <Header />
                <Dashboard/>
                <NewApllication/>
                <Footer />
              </UserRoute>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
