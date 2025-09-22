import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './Pages/Profile/Profile.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import TrainList from './Pages/TrainList/TrainList.jsx'
import Search from './Pages/Search/Search.jsx'
import Class from './Pages/Class/Class.jsx'
import Login from './Pages/Login/Login.jsx'
import Signup from './Pages/Signup/Signup.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
  
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/contact" element={<Contact/> } />
      <Route path = "/profile" element={<Profile/>} />
      <Route path="/trainlist/:line" element={<TrainList/>}/>
      <Route path="/search" element={<Search/>}/>
      <Route path="/class" element={<Class/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Signup/>}/>
    </Routes>
  </BrowserRouter>
  </ClerkProvider>
  ,
)
