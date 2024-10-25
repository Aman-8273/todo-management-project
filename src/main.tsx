import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import App from './App';
import { GOOGLE_KEY } from './constants';
import client from './apollo-client';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_KEY}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
