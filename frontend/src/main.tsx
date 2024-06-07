import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthcontextProvider } from './component/Auth.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthcontextProvider>
      <App />
      </AuthcontextProvider>
      
  
  </React.StrictMode>,
)
