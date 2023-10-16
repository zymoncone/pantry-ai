import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Login } from "./Login"
import { Register } from "./Register"
import { BrowserRouter, Routes, Route} from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route path="Login" element={<Login/>} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
  
);
