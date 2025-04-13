import React ,{useState,createContext, useContext, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route , Navigate,useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TaskPage from "./pages/TaskPage";
import Layout from './layouts/Layout';
import Login from './auth/pages/Login';
function App() {
const isAuth = true;
useEffect(()=>{
  if(!isAuth){
    // window.location.href='/login';
  }
},[isAuth])
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          {isAuth && <Route path="/" element={<TaskPage />} />}
          <Route path="/login" element={<Login/>} />


          {/* <Route path="*" element={<NotFound/>} /> */}
        </Route>


      </Routes>
    </Router>        
    </>
  )
}

export default App
