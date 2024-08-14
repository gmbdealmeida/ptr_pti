import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18nextConf';
import { CookiesProvider } from "react-cookie";
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
      <ToastContainer />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
