import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import App from './App.tsx';
import UserProvider from "./providers/UserProvider.tsx";
import GlobalStyle from './globalStyles';

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <GlobalStyle />
      <UserProvider>
          <App />
      </UserProvider>
  </React.StrictMode>
);
