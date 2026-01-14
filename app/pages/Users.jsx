import React from 'react'
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

function Users() {
    return (
        <Typography variant='h1'>User Page</Typography>
    )
}
export default Users