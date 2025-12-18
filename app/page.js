'use client' //indicates this is a client-side component

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
}

export default function Home() {
    const updateInventory = async () => {
  const snapshot = query(collection(firestore, 'inventory'))
  const docs = await getDocs(snapshot)
  const inventoryList = []
  docs.forEach((doc) => {
    inventoryList.push({ name: doc.id, ...doc.data() })
  })
  setInventory(inventoryList)
}

useEffect(() => {
  updateInventory()
}, [])

const addItem = async (item) => { //adds new item to Firestore
    const docRef = doc(collection(firestore, 'inventory'), item) //references new doc
    const docSnap = await getDoc(docRef) //checks if doc already exists
    if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        await setDoc(docRef, { quantity: quantity + 1 }) //increments quantity if exists
    } else {
        await setDoc(docRef, { quantity: 1 }) //creates new doc with quantity 1
    }
    await updateInventory() //refreshes inventory list
}

const removeItem = async (item) => { //removes item from Firestore
    const docRef = doc(collection(firestore, 'inventory'), item) //references doc
    await deleteDoc(docRef) //deletes doc
    if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        if (quantity == 1) {
            await deleteDoc(docRef) //deletes doc if quantity is 1
        } else {
            await setDoc(docRef, { quantity: quantity - 1 }) //decrements quantity
        }
    }
    await updateInventory() //refreshes inventory list
}

const handleOpen = () => setOpen(true) //opens modal
const handleClose = () => setOpen(false) //closes modal

const [inventory, setInventory] = useState([]) //manages inventory list
const [open, setOpen] = useState(false) //manages modal visibility
const [itemName, setItemName] = useState('') //manages new item name
return (
  <Box
   width="100vw"
   height="100vh"
   display={'flex'}
   justifyContent={'center'}
   flexDirection={'column'}
   alignItems={'center'}
   gap={2}
  >
      <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
          <Typography id = "modal-modal-title" variant="h6" component="h2">
              Add New Item
          </Typography>
          <Stack width={'100%'} direction={'row'} spacing={2}>
              <TextField
                  id = "outlined-basic"
                  label = "Item Name"
                  variant = "outlined"
                  fullWidth
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)} //updates itemName state
              />
              <Button variant="outlined" onClick={() => {
                  addItem(itemName) //calls addItem function
                  setItemName('') //resets itemName state
                  handleClose() //closes modal
              }}
              >
                  Add
              </Button>
              </Stack>
      </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
          Add New Item
      </Button>
      <Box border={'1px solid #333'}>
          <Box width="800px" height={'100px'} bgcolor={'#ADD8E6'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <Typography variant="h2" color="#333" textAlign={'center'}>
                  Inventory Items
              </Typography>
          </Box>
          <Stack width="800px" height="300px" spacing={2} overflow="auto">
              {inventory.map(((name, quantity) => (
                  <Box key={name} width="100%" minHeight={'150px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'#f0f0f0'} paddingX={5}>
                      <Typography variant={'h3'} color='#333' textAlign={'center'}>
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                      </Typography>
                      <Typography variant='h3' color='#333' textAlign={'center'}>
                          Quantity: {quantity}
                      </Typography>
                      <Button variant='contained' onClick={() => removeItem(name)}>
                          Remove
                      </Button>
                  </Box>
              )))}
          </Stack>
      </Box>
  </Box>
  )
}