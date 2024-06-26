import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, register } from '../Auth/authService';
import { useNavigate } from 'react-router-dom';

const token = localStorage.getItem('token');
const initialState ={
  isAuthenticated:!!token,
  user:token,
  status:'idle',
  error:null
};

export const loginAsync = createAsyncThunk(
  'Auth/login',
  async ({ email, password }, thunkAPI) => {
    console.log(email, password)
    try {
      const response = await login(email, password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const registerAsync = createAsyncThunk(
  'Auth/signup',
  async ({ fullName, email, password }, thunkAPI) => {
    try {
      const response = await register(fullName, email, password);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem('token', action.payload.data.token); // Store token in local storage
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;