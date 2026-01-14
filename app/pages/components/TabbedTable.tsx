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
      aria-labelledby={`simple-tab-${uuidv4()}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, overflow: 'auto', minHeight: 0 }}>
          <Typography component={'div'}>{children}</Typography>
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
    <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#bdb7ab' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="basic tabs example"
          sx={{ minHeight: 0 }}
        >
          <Tab label="Packs" id={uuidv4()} />
          <Tab label="Tents" id={uuidv4()} />
          <Tab label="Sleeping Pads" id={uuidv4()} />
          <Tab label="Headlamps" id={uuidv4()} />
          <Tab label="Filters" id={uuidv4()} />
          <Tab label="Cooking" id={uuidv4()} />
          <Tab label="Saws" id={uuidv4()} />
          <Tab label="Bear" id={uuidv4()} />
          <Tab label="Trowels" id={uuidv4()} />
          <Tab label="Snowshoes" id={uuidv4()} />
          <Tab label="Misc. - White Box" id={uuidv4()} />
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0 }}>
        <TabPanel value={value} index={0}>
          <ReactVirtualizedTable table="packs" />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ReactVirtualizedTable table="tents" />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ReactVirtualizedTable table="sleeping-pads" />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ReactVirtualizedTable table="headlamps" />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ReactVirtualizedTable table="filters" />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ReactVirtualizedTable table="cooking" />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <ReactVirtualizedTable table="saws" />
        </TabPanel>
        <TabPanel value={value} index={7}>
          <ReactVirtualizedTable table="bear" />
        </TabPanel>
        <TabPanel value={value} index={8}>
          <ReactVirtualizedTable table="trowels" />
        </TabPanel>
        <TabPanel value={value} index={9}>
          <ReactVirtualizedTable table="snowshoes" />
        </TabPanel>
        <TabPanel value={value} index={10}>
          <ReactVirtualizedTable table="misc" />
        </TabPanel>
      </Box>
    </Box>
  )
}