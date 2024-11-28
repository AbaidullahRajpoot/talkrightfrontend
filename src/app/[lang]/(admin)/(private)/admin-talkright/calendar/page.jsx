'use client'

// MUI Imports
import Card from '@mui/material/Card'

// Component Imports
import CalendarWrapper from './components/CalendarWrapper'

// Styled Component Imports
import AppFullCalendar from '@/libs/styles/AppFullCalendar'

const CalendarApp = () => {

  return (
    <Card className='overflow-visible calenderscreen  '>
      <AppFullCalendar className='app-calendar'>
        <CalendarWrapper />
      </AppFullCalendar>
    </Card>
  )
}

export default CalendarApp


