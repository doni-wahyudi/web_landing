import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { WhatsAppModalProvider } from './context/WhatsAppModalContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <WhatsAppModalProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </WhatsAppModalProvider>
    </LanguageProvider>
  </StrictMode>
)

