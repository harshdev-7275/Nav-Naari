import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Hero from './components/Hero';
import Login from './components/Login';
import ApplyJobs from './components/ApplyJobs';
import Register from './components/Register';
import HireWorker from './components/HireWorker';
import CreateWorkerProfile from './components/CreateWorkerProfile';
import WorkerHireProfile from './components/WorkerHireProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Layout><Hero /></Layout>} />

        {/* Route for the login page */}
        <Route path="/login" element={<Layout><Login /></Layout>} />

        {/* Route for creating worker profile */}
        <Route path="/createWorkerProfile" element={<Layout><CreateWorkerProfile /></Layout>} />

        {/* Route for the registration page */}
        <Route path="/register" element={<Layout><Register /></Layout>} />

        {/* Route for applying jobs */}
        <Route path="/apply" element={<Layout><ApplyJobs /></Layout>} />

        {/* Route for hiring a worker */}
        <Route path="/hireworker" element={<Layout><HireWorker /></Layout>} />

        {/* Route for worker hired dashboard with dynamic id */}
        <Route path="/workerhireddashboard/:id" element={<Layout><WorkerHireProfile /></Layout>} />

        {/* Fallback route for unknown paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
