import { createSlice } from '@reduxjs/toolkit';

import { extraReducers, userReducers } from './actions';

import User from '@/types/user';

export interface UserState {
  user: User;
  isLoadingFetchUser: boolean;
}

const initialState: UserState = {
  user: {
    email: '',
    name: '',
    id: '',
    imageUrl: '',
  },
  isLoadingFetchUser: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: userReducers,
  extraReducers: extraReducers,
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
