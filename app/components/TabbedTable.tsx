import React, { useState } from 'react'
import { Tabs, Tab, Box, Typography } from '@mui/material'
import ReactVirtualizedTable from './TableComponent'
import { v4 as uuidv4 } from 'uuid'

function TabPanel(props: { [x: string]: any; children: any; value: any; index: any }) {
    const { children, value, index, ...other } = props
    return (
        <div 
          role="tabpanel"
          hidden={value !== index}
          id={uuidv4()}
          aria-labelledby='simple-tab-${id}'
          {...other}
          >
            {value === index && (
                <Box sx={{ p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
          </div>
    )
}

export function TabbedTables() {
    const [value, setValue] = useState(0)

    const handleChange = (_event: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue)
    }

    return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Packs" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
          <Tab label="Tents" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {/* Pass data to the first table component */}
        <ReactVirtualizedTable table='packs'/> {/* make this take in a prop for which table*/}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* Pass data to the second table component */}
        <ReactVirtualizedTable table='tents'/>
      </TabPanel>
    </Box>
  )
}