import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/scss/main.scss'
import { RecordingProvider } from './context/RecordingProvider.jsx';
import UserProvider from './context/UserProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RecordingProvider>
      <App />
      </RecordingProvider>
    </UserProvider>
  </StrictMode>,
)
