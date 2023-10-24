import { AxiosError } from 'axios';
import {
  ActionReducerMapBuilder,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import * as userAdapter from '@/adapters/users';
import User from '@/types/user';

import { UserState } from './users';

export const FETCH_USER_ACTION = 'fetch/user';
export type FETCH_USER_ACTION = typeof FETCH_USER_ACTION;

export const fetchUserAction: AsyncThunkPayloadCreator<User, void> = async (
  _,
  { rejectWithValue }
) => {
  try {
    const user = (await userAdapter.fetchCurrentUser()) as unknown as User;

    return user;
  } catch (error: any) {
    const axiosError = error as unknown as AxiosError;

    if (!axiosError.response) {
      throw error;
    }

    const { data, status } = axiosError.response;

    return rejectWithValue({ data, status });
  }
};

export const fetchUser = createAsyncThunk(FETCH_USER_ACTION, fetchUserAction);

export const extraReducers: (builder: ActionReducerMapBuilder<UserState>) => void = (builder) => {
  builder.addCase(fetchUser.fulfilled, (state: UserState, action: PayloadAction<User>) => {
    state.isLoadingFetchUser = false;
    state.user = action.payload;
  });

  builder.addCase(fetchUser.rejected, (state: UserState) => {
    state.isLoadingFetchUser = false;
  });

  builder.addCase(fetchUser.pending, (state: UserState) => {
    state.isLoadingFetchUser = true;
  });
};

export const userReducers = {
  setUser: (state: UserState, action: PayloadAction<User>): void => {
    state.user = action.payload;
  },
};
