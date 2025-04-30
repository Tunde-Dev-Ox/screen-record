import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/scss/main.scss'
import { RecordingProvider } from './context/RecordingProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecordingProvider>
      <App />
    </RecordingProvider>
  </StrictMode>,
)
