import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Login } from "./Login"
import { Register } from "./Register"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route
          path="/"
          element={
            <PrivateRoutes>
              <App />
            </PrivateRoutes>
          }
        />
    <Route path="/login" element={<Login />} />
  </Routes>
  </BrowserRouter>
  </React.StrictMode>
);
