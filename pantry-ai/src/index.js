import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Login } from "./routes/Login"
import { Register } from "./routes/Register"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoutes from './routes/PrivateRoutes'
import PublicRoutes from './routes/PublicRoutes'


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
    <Route
          path="/pantry-ai"
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
