'use client'

import React from 'react'
import { Routes, Route, HashRouter as Router } from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'
import Users from './pages/Users'
import Register from './pages/Register'
import { AuthProvider } from './contexts/authContext'

export default function App() {
    return (
        <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Main/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </Router>
        </AuthProvider>
    )
}