import React from 'react'

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Layout from './layout/Layout'
import Hero from './components/Hero'
import Login from './components/Login'

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
          <p>Register</p>
        </Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App