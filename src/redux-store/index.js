// Third-party Imports
import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'

import { talkrightApi } from './api/talkrightApi'

// Slice Imports
import chatReducer from '@/redux-store/slices/chat'
import calendarReducer from '@/redux-store/slices/calendar'
import kanbanReducer from '@/redux-store/slices/kanban'
import emailReducer from '@/redux-store/slices/email'


export const store = configureStore({
  reducer: {
    [talkrightApi.reducerPath]: talkrightApi.reducer,
    chatReducer,
    calendarReducer,
    kanbanReducer,
    emailReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(talkrightApi.middleware),
})

setupListeners(store.dispatch)
