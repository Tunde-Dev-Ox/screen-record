import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './views/home'
import Dashboard from './views/dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import Library from './views/library'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
      <Toaster position='top-right' toastOptions={{ duration: 6000 }}/>
      <BrowserRouter>
         <Routes>
           <Route path='/' element={<Home />} />
           <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
            <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
