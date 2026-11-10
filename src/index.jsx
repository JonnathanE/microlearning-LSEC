import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes/Routes';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';

import AuthProvider from './auth/AuthProvider';

import './index.css';

const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <AuthProvider>
        <Routes />
        {/* <ReactQueryDevtools /> */}
      </AuthProvider>
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById('root')
);
