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
import UserProfile from './components/Learner/LearnerDashboard/UserProfile';
import AdminSettings from './components/Admin/pages/AdminSettings';
import AdminLogin from './components/Admin/components/AdminLogin';
import AdminSignup from './components/Admin/components/AdminSignup';
import AdminCourseDetails from './components/Admin/pages/AdminCourseDetails';
import AdminCreateInvoice from './components/Admin/pages/AdminCreateInvoice';
import AdminLearners from './components/Admin/pages/AdminLearners';
import AdminCreateLearner from './components/Admin/pages/AdminCreateLearner';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin" element={
          <AdminRoute>
          <AdminDashboard />
          </AdminRoute>
        } />
        
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

          <Route path="/admin/create-learners" element={
          <AdminRoute>
          <AdminCreateLearner />
          </AdminRoute>
        } />
        <Route path="/admin/create-invoices" element={
          <AdminRoute>
          <AdminCreateInvoice />
          </AdminRoute>
        } />
          
          <Route path="/admin/courses" element={
          <AdminRoute>
          <AdminCourses />
          </AdminRoute>
        } />

          <Route path="/admin/learners" element={
          <AdminRoute>
          <AdminLearners />
          </AdminRoute>
        } />

          <Route path="/admin/settings" element={
          <AdminRoute>
          <AdminSettings />
          </AdminRoute>
        } />

          <Route path="/admin/courses/:id" element={
          <AdminRoute>
          <AdminCourseDetails />
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
            <Route
            path="/profile"
            element={
              <>
              <UserRoute>
              <Header />
              <Dashboard/>
              <UserProfile />
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
