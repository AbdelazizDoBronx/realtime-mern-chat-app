import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SignInPage from './Pages/SignInPage'
import LoginPage from './Pages/LoginPage'
import SettingsPage from './Pages/SettingsPage'
import ProfilePage from './Pages/ProfilePage'
import Navbar from './Components/Navbar'
import {useAuthStore} from './Store/useAuthStore'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();

  useEffect(()=>{checkAuth()},[checkAuth])
  console.log({authUser})

  if(isCheckingAuth && !authUser){
    return(
          <div className='flex justify-center items-center h-screen'>
            <span className="loading loading-infinity loading-lg"></span>
          </div>
    )
  }
  return (
    <div>
      <Navbar />
      <Toaster position="top-center" /> 
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to='/login' /> }/>
        <Route path='/signin' element={authUser ? <Navigate to='/' /> : <SignInPage/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/' />}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to='/login' />}/>
      </Routes>
    </div>
  )
}

export default App