import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { api } from '@/services/api'

export interface Document {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  tags: string[]
  category: string
}

interface DocumentsState {
  documents: Document[]
  currentDocument: Document | null
  loading: boolean
  error: string | null
}

const initialState: DocumentsState = {
  documents: [],
  currentDocument: null,
  loading: false,
  error: null,
}

export const fetchDocuments = createAsyncThunk(
  'documents/fetchDocuments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getDocuments()
      return response
    } catch (error) {
      return rejectWithValue('Failed to fetch documents')
    }
  }
)

export const fetchDocumentById = createAsyncThunk(
  'documents/fetchDocumentById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.getDocumentById(id)
      return response
    } catch (error) {
      return rejectWithValue(`Failed to fetch document with id ${id}`)
    }
  }
)

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    clearCurrentDocument: (state) => {
      state.currentDocument = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDocuments.fulfilled, (state, action: PayloadAction<Document[]>) => {
        state.loading = false
        state.documents = action.payload
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchDocumentById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDocumentById.fulfilled, (state, action: PayloadAction<Document>) => {
        state.loading = false
        state.currentDocument = action.payload
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearCurrentDocument } = documentsSlice.actions

export default documentsSlice.reducer