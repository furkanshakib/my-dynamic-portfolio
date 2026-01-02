import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 👈 IMPORTANT IMPORT
import App from './App.jsx'
import { ThemeProvider } from './ThemeContext' // 👈 Keep your theme working
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* 1. The Router wraps everything */}
      <ThemeProvider> {/* 2. The Theme wraps the App */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)