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
    Checkbox, FormControlLabel, Divider } from '@mui/material'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext'
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'

function Register() {
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userID, setUserID] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const mapAuthError = (code, message) => {
        switch(code) {
            case 'auth/email-already-in-use': return 'That email is already in use.'
            case 'auth/weak-password': return 'Password is too weak. Use at least 6 characters.'
            case 'auth/invalid-email': return 'Invalid email address.'
            default: return message || 'Registration error.'
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        if (isRegistering) return
        setErrorMessage('')
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match')
            return
        }
        setIsRegistering(true)
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password)
            // set display name to entered username
            try {
                await updateProfile(cred.user, { displayName: userID })
            } catch (err) {
                // non-fatal; continue
            }
            try { await sendEmailVerification(cred.user) } catch(_) {}
            setIsRegistering(false)
            navigate('/home')
        } catch (err) {
            const code = err?.code || ''
            setErrorMessage(mapAuthError(code, err?.message))
            setIsRegistering(false)
        }
    }
    
    return (
        <Box className="full-vh" bgcolor="#000000" p={1} m={0}>
                {userLoggedIn && (<Navigate to={'/home'} replace={true}/>) }
                <Stack sx={{width: '100%', maxWidth: 520, px: 2}}>
                    <Typography variant='h3'>Sign Up For An OAC Inventory Account</Typography>
                    <Divider/>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Username
                            </label>
                            <input
                                type="username"
                                autoComplete='username'
                                required
                                value={userID} onChange={(e) => { setUserID(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='new-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Confirm Password
                            </label>
                            <input
                                disabled={isRegistering}
                                type="password"
                                autoComplete='off'
                                required
                                value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-sm text-center">
                            Already have an account? {'   '}
                            <Link to={'/'} className="text-center text-sm hover:underline font-bold">Continue</Link>
                        </div>
                    </form>
                </Stack>
        </Box>
    )
}
export default Register