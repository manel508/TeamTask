import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const tokenConfig = (getState) => {
  const token = getState().auth.user?.token;
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

// 📥 Récupérer les tâches
export const fetchTasks = createAsyncThunk('tasks/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/api/tasks', tokenConfig(thunkAPI.getState));
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// ➕ Créer une tâche (manager only)
export const createTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
  try {
    const res = await axios.post('/api/tasks', taskData, tokenConfig(thunkAPI.getState));
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// 🔄 Modifier une tâche
export const updateTask = createAsyncThunk('tasks/update', async ({ id, updates }, thunkAPI) => {
  try {
    const res = await axios.put(`/api/tasks/${id}`, updates, tokenConfig(thunkAPI.getState));
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

// ❌ Supprimer une tâche
export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    await axios.delete(`/api/tasks/${id}`, tokenConfig(thunkAPI.getState));
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    isLoading: false,
    isError: false,
    message: '',
  },
  reducers: {
    resetTaskState: (state) => {
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.isLoading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map(task => task._id === action.payload._id ? action.payload : task);
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      });
  },
});

export const { resetTaskState } = taskSlice.actions;
export default taskSlice.reducer;
