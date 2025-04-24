import { configureStore } from '@reduxjs/toolkit'
import documentsReducer from './slices/documentsSlice'
import searchReducer from './slices/searchSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    documents: documentsReducer,
    search: searchReducer,
    ui: uiReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch