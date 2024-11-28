'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import { useMediaQuery } from '@mui/material'

// Third-party Imports
import { useDispatch, useSelector } from 'react-redux'

// Component Imports
import moment from 'moment-timezone'

import { toast } from 'react-toastify'

import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import AddEventSidebar from './AddEventSidebar'


import { updateData } from '@/redux-store/slices/calendar'
import ProgressCircularCustomization from '@components/loader'
import { useCalenderMutation } from '@/redux-store/api/talkrightApi'


const AppCalendar = () => {

  // States
  const [calendarApi, setCalendarApi] = useState(null)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [addEventSidebarOpen, setAddEventSidebarOpen] = useState(false)
  const [colors, setColors] = useState(['info', 'primary', 'warning', 'success', 'error'])

  const [calendarsColor, setcalendarsColor] = useState({
    'Empty': 'info',
  })

  const [loading, setloading] = useState(false)
  const [mainloading, setMainloading] = useState(true)

  // Hooks
  const dispatch = useDispatch()
  const calendarStore = useSelector(state => state.calendarReducer)
  const mdAbove = useMediaQuery(theme => theme.breakpoints.up('md'))
  const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
  const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)

  //Api Hooks
  const [calender] = useCalenderMutation()

  //--------------------------Convert data into calender form-----------------------------------------

  function convertCalendarEvents(events) {
    return events.map(event => {

      const StartdateInDubai = moment.tz(event.start.dateTime, 'Asia/Dubai').toDate();
      const EnddateInDubai = moment.tz(event.end.dateTime, 'Asia/Dubai').toDate();

      return {
        id: event.id,
        url: event.htmlLink,
        title: event.organizer.displayName,
        description: event?.description,
        creator: event?.creator?.email,
        start: StartdateInDubai,
        end: EnddateInDubai,
        allDay: false,
        extendedProps: {
          calendar: event.organizer.displayName,
          guests: event?.attendees,
        }
      };
    });
  }


  //--------------------------get data of specific date-----------------------------------------

  function filterData(data, sameFormatDate) {

    const filteredData = [];
    const uniqueTitles = new Set();

    data.forEach((event, index) => {

      event.id = index + 1
      event.url = ""
      filteredData.push(event);

      if (!uniqueTitles.has(event.title)) {
        uniqueTitles.add(event.title);
      }

    });

    const resultData = {
      filteredData,
      uniqueTitles
    }

    return resultData;
  }

  //----------------- Function to get a random color---------------------------

  function getRandomColor() {

    const randomIndex = Math.floor(Math.random() * colors.length);

    return colors[randomIndex];
  }

  //-------------------------------------Get Data when page rendered-----------------------------------

  const handleDate = async () => {

    const dubaidate = moment.tz('Asia/Dubai');
    const date = dubaidate.format('YYYY-MM-DDTHH:mm:ssZ');

    const startTime = date.split('T')[0] + 'T00:00:00+04:00';
    const endTime = date.split('T')[0] + 'T23:59:59+04:00';

    const data = {
      startTime,
      endTime
    }

    try {
      const calenderResult = await calender({ data: data });

      if (calenderResult?.data.length >= 0) {
        const convertedEvents = await convertCalendarEvents(calenderResult?.data);

        const finalResult = filterData(convertedEvents, date)

        const arrayPersonName = Array.from(finalResult.uniqueTitles);

        const calendarsColor = arrayPersonName.reduce((acc, detail) => {

          const name = detail;

          acc[name] = getRandomColor();

          return acc;
        }, {});

        setcalendarsColor(calendarsColor)

        const calenderData = {
          events: finalResult.filteredData,
          filteredEvents: finalResult.filteredData,
          selectedEvent: arrayPersonName,
          selectedCalendars: arrayPersonName
        }

        dispatch(updateData(calenderData))

        setMainloading(false)
      }
      else {
        setcalendarsColor({
          'Empty': 'info',
        })

        const calenderData = {
          events: [],
          filteredEvents: [],
          selectedEvent: [],
          selectedCalendars: []
        }

        dispatch(updateData(calenderData))

        if (calendarApi) {
          calendarApi.gotoDate(data)
        }

        setMainloading(false)
      }
    } catch (error) {
      toast.error(error.message);
    }

  }

  const handleChangeDate = (data) => {
    if (calendarApi) {
      calendarApi.gotoDate(data)
    }
  }

  //--------------------------------Call Whenever Page Rendered------------------------


  useEffect(() => {
    handleDate()
  }, [])

  return (
    mainloading == false ?
      <>
        <SidebarLeft
          mdAbove={mdAbove}
          dispatch={dispatch}
          calendarApi={calendarApi}
          calendarStore={calendarStore}
          calendarsColor={calendarsColor}
          leftSidebarOpen={leftSidebarOpen}
          handleLeftSidebarToggle={handleLeftSidebarToggle}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          handleChangeDate={handleChangeDate}
        />
        <div className='p-6 pbe-0 flex-grow overflow-visible bg-backgroundPaper rounded'>
          <Calendar
            dispatch={dispatch}
            calendarApi={calendarApi}
            calendarStore={calendarStore}
            setCalendarApi={setCalendarApi}
            calendarsColor={calendarsColor}
            handleLeftSidebarToggle={handleLeftSidebarToggle}
            handleAddEventSidebarToggle={handleAddEventSidebarToggle}
          />
        </div>
        <AddEventSidebar
          dispatch={dispatch}
          calendarApi={calendarApi}
          calendarStore={calendarStore}
          addEventSidebarOpen={addEventSidebarOpen}
          handleAddEventSidebarToggle={handleAddEventSidebarToggle}
        />
      </>
      :
      <ProgressCircularCustomization />

  )
}

export default AppCalendar
