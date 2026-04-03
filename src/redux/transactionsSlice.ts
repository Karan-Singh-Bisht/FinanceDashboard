import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import type { Transaction } from '@/components/transactions/types'
import { transactions as seedData } from '@/components/transactions/data'

const STORAGE_KEY = 'luminous-ledger-transactions'

/*{

Redux Slice to load, fetch, save, update
and delete transactions.

}*/

function loadFromStorage(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Transaction[]
  } catch {
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData))
  return seedData
}

function saveToStorage(transactions: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchAll',
  async () => {
    /*
        API REQUEST DEMO
        try{
            const response = await axios.get<Transaction[]>(`${API_BASE_URL}/transactions`);
            const data = response.data;
            return data;
        }catch(err:any){
            console.error('Failed to fetch transactions:', err);
        }
    */
    const data = loadFromStorage()
    return data
  }
)

export const addTransaction = createAsyncThunk(
  'transactions/add',
  async (transaction: Transaction, { getState }) => {
    const { transactions } = getState() as { transactions: TransactionsState }
    const updated = [transaction, ...transactions.items]
    saveToStorage(updated)
    return transaction
  }
)

export const updateTransaction = createAsyncThunk(
  'transactions/update',
  async (transaction: Transaction, { getState }) => {
    const { transactions } = getState() as { transactions: TransactionsState }
    const updated = transactions.items.map((tx) =>
      tx.id === transaction.id ? transaction : tx
    )
    saveToStorage(updated)
    return transaction
  }
)

export const deleteTransaction = createAsyncThunk(
  'transactions/delete',
  async (id: string, { getState }) => {
    const { transactions } = getState() as { transactions: TransactionsState }
    const updated = transactions.items.filter((tx) => tx.id !== id)
    saveToStorage(updated)
    return id
  }
)

type TransactionsState = {
  items: Transaction[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TransactionsState = {
  items: [],
  status: 'idle',
  error: null,
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTransactions.fulfilled, (state, action: PayloadAction<Transaction[]>) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Failed to load transactions'
      })

      .addCase(addTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        state.items.unshift(action.payload)
      })

      .addCase(updateTransaction.fulfilled, (state, action: PayloadAction<Transaction>) => {
        const idx = state.items.findIndex((tx) => tx.id === action.payload.id)
        if (idx !== -1) state.items[idx] = action.payload
      })

      .addCase(deleteTransaction.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((tx) => tx.id !== action.payload)
      })
  },
})

export default transactionsSlice.reducer
