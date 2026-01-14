'use client'

import React, { useState } from 'react'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'
import { Box, Stack, Typography, Button, Modal, TextField, 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
    Checkbox, FormControlLabel, Divider, 
    Input} from '@mui/material'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { doSignInWithEmailAndPassword } from '../../auth.js'
import { useAuth } from '../contexts/authContext'
import { Label } from '@mui/icons-material'

function Login() {
    const { userLoggedIn } = useAuth
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const mapAuthError = (code, message) => {
        switch(code) {
            case 'auth/user-not-found': return 'No account found for that email.'
            case 'auth/wrong-password': return 'Incorrect password.'
            case 'auth/invalid-email': return 'Invalid email address.'
            case 'auth/too-many-requests': return 'Too many attempts. Try again later.'
            default: return message || 'Authentication error.'
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (isSigningIn) return
        setIsSigningIn(true)
        setErrorMessage('')
        try {
            await doSignInWithEmailAndPassword(email, password)
            setIsSigningIn(false)
            navigate('/home')
        } catch (err) {
            const code = err?.code || ''
            setErrorMessage(mapAuthError(code, err?.message))
            setIsSigningIn(false)
        }
    }
    
    return (
        <Box 
            width="100vw"
            minHeight="100vh"
            display={'flex'} 
            justifyContent={'center'}
            flexDirection={'row'}
            alignItems={'center'}
            gap={2}
            overflow={'auto'}
            bgcolor={'#000000'}
            p={1}
            m={1}
            borderRadius={1}>
                {userLoggedIn && (<Navigate to={'/home'} replace={true}/>)}
                <Stack>
                    <Typography variant='h3'>OAC Inventory</Typography>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>


                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="text-center text-sm">Don't have an account? <Link to={'/register'} className="hover:underline font-bold">Sign up</Link></p>
                </Stack>
        </Box>
    )
}
export default Login