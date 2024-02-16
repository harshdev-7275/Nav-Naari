import React from 'react'

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Layout from './layout/Layout'
import Hero from './components/Hero'
import Login from './components/Login'
import ApplyJobs from "./components/ApplyJobs"
import WorkerProfile from './components/WorkerProfile'
import Register from './components/Register'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout >
          <Hero /> 
        </Layout>} />
        <Route path='/login' element={<Layout>
          <Login/>
        </Layout>} />
        <Route path='/register' element={<Layout>
          <Register/>
        </Layout>} />
        <Route path='/apply' element={<Layout>
          <ApplyJobs/>
        </Layout>} />
        <Route path='/workerprofile' element={<Layout>
          <WorkerProfile/>
        </Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App