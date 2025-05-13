import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';

import ReactLogo from './assets/react.svg'
import '@ant-design/v5-patch-for-react-19'; 

import './gloabal.css'

import './assets/font/font.css'
import './index.css'
import MainLayout from './Layouts/MainLayout.jsx'
import HomePage from './pages/homePage.jsx'
import { _config, IsAdmin } from './Model/GlobalData.js';
import UserinfoPage from './pages/userinfoPage.js';
import AboutPage from './pages/AboutPage.js';

createRoot(document.getElementById('app')).render(
  <>
      <HashRouter>
      <Routes>
        <Route path="*" element={<MainLayout />}>
          <Route index element={<HomePage />} />     
          <Route path="home" element={<HomePage />} /> 
          <Route path="@me" element={<UserinfoPage/>} />
          <Route path="@about" element={<AboutPage/>} />
        </Route>
      </Routes>
    </HashRouter>
    </>
)
