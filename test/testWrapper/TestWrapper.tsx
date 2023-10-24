import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';

import { rootReducers } from '@/reducers/store';

interface TestWrapperProps {
  children: React.ReactNode;
}

let store: ReturnType<typeof configureStore>;

beforeEach(() => {
  store = configureStore({ reducer: rootReducers });
});

const TestWrapper = ({ children }: TestWrapperProps): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export default TestWrapper;
