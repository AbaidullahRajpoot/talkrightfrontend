// Third-party Imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  events: [],
  filteredEvents: [],
  selectedEvent: null,
  selectedCalendars: [],
  selectedAllCalendars: [],
}

const filterEventsUsingCheckbox = (events, selectedCalendars) => {
  return events.filter(event => selectedCalendars.includes(event.extendedProps?.calendar))
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: initialState,
  reducers: {

    updateData: (state, action) => {
      state.events = action.payload.events;
      state.filteredEvents = action.payload.filteredEvents;
      state.selectedEvent = null;
      state.selectedCalendars = action.payload.selectedCalendars;
      state.selectedAllCalendars = action.payload.selectedCalendars;
    },

    filterEvents: state => {
      state.filteredEvents = state.events
    },
    addEvent: (state, action) => {
      const newEvent = { ...action.payload, id: `${parseInt(state.events[state.events.length - 1]?.id ?? '') + 1}` }

      state.events.push(newEvent)
    },
    updateEvent: (state, action) => {
      state.events = state.events.map(event => {
        if (action.payload._def && event.id === action.payload._def.publicId) {
          return {
            id: event.id,
            url: action.payload._def.url,
            title: action.payload._def.title,
            allDay: action.payload._def.allDay,
            end: action.payload._instance.range.end,
            start: action.payload._instance.range.start,
            extendedProps: action.payload._def.extendedProps
          }
        } else if (event.id === action.payload.id) {
          return action.payload
        } else {
          return event
        }
      })
    },
    deleteEvent: (state, action) => {
      state.events = state.events.filter(event => event.id !== action.payload)
    },
    selectedEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    filterCalendarLabel: (state, action) => {
      const index = state.selectedCalendars.indexOf(action.payload)

      if (index !== -1) {
        state.selectedCalendars.splice(index, 1)
      } else {
        state.selectedCalendars.push(action.payload)
      }

      state.events = filterEventsUsingCheckbox(state.filteredEvents, state.selectedCalendars)
    },
    filterAllCalendarLabels: (state, action) => {
      if (action.payload == true) {
        state.selectedCalendars = []
        state.events = filterEventsUsingCheckbox(state.filteredEvents, state.selectedCalendars)
      }
      else {
        state.selectedCalendars = state.selectedAllCalendars
        state.events = filterEventsUsingCheckbox(state.filteredEvents, state.selectedCalendars)
      }

    }
  }
})
export const {
  updateData,
  filterEvents,
  addEvent,
  updateEvent,
  deleteEvent,
  selectedEvent,
  filterCalendarLabel,
  filterAllCalendarLabels
} = calendarSlice.actions
export default calendarSlice.reducer
