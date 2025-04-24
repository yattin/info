import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { api } from '@/services/api'
import { Document } from './documentsSlice'

interface SearchState {
  query: string
  results: Document[]
  loading: boolean
  error: string | null
}

const initialState: SearchState = {
  query: '',
  results: [],
  loading: false,
  error: null,
}

export const searchDocuments = createAsyncThunk(
  'search/searchDocuments',
  async (query: string, { rejectWithValue }) => {
    try {
      if (!query.trim()) return []
      const response = await api.searchDocuments(query)
      return response
    } catch (error) {
      return rejectWithValue('Failed to search documents')
    }
  }
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    clearSearch: (state) => {
      state.query = ''
      state.results = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchDocuments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchDocuments.fulfilled, (state, action: PayloadAction<Document[]>) => {
        state.loading = false
        state.results = action.payload
      })
      .addCase(searchDocuments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { setQuery, clearSearch } = searchSlice.actions

export default searchSlice.reducer