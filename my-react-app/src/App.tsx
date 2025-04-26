import './App.css'
import Lol from './components/lol'
import Login from './pages/login'
import Signup from './pages/signup'
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, } from "react-router-dom"
// import { useState, useEffect } from "react"
import ProtectedRoute from './hooks/protectedroute'
import Header from "./components/Header"
import Hero from "./components/Hero"
import Features from "./components/Features"
import BookShowcase from "./components/BookShowcase"
import Footer from "./components/Footer"
import PostList from './pages/postList'
import BookDetails from './pages/BookDetails'
import UserProfile from './pages/profilePage'

function App() {

  return (
    <BrowserRouter>
      <Header />
        <AppRoutes />
      <Footer/>
    </BrowserRouter>
  )
}

const AppRoutes=()=>{
  return(
    <>
      <Routes>
        <Route path="/" 
        element={<main>
                      <Hero />
                      <Features />
                      <BookShowcase />
                  </main>
                }
        />
        <Route
          path="/lol"
          element={
            <ProtectedRoute>
              <Lol />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/posts" element={<PostList/>}/>
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/profile" element={<UserProfile/>}/>
      </Routes>
    </>
  )
}

export default App
