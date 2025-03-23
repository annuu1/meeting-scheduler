import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'

import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Preferences from './components/auth/Preferences'
import Header from './components/layout/Header'
import Dashboard from './pages/Dashboard'
import EventForm from './components/Events/EventForm'
import Test from './components/test/Test'

function App() {

  return (
    <>
     <BrowserRouter>
     {/* <Header/> */}
      <Routes>
        <Route path='/' element= {<Home/>} ></Route>
        <Route path='/signup' element= {<Signup/>} ></Route>
        <Route path='/login' element= {<Login/>} ></Route>
        <Route path='/preferences' element= {<Preferences/>} ></Route>
        <Route path='/dashboard' element= {<Dashboard/>} ></Route>
        <Route path='/events/new' element= {<EventForm/>} ></Route>
        <Route path='/test' element= {<Test/>} ></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
