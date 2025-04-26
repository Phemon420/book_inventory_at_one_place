"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserInfoFromToken } from "../utils/token"
import { useEffect } from "react"

const Header = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  useEffect(() => {
    const user = getUserInfoFromToken();
    console.log(user);
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/images/logo.png" alt="BookVault Logo" className="h-10 w-auto mr-3" />
          <h1 className="text-2xl font-bold text-deepblue-950">BookVault</h1>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-deepblue-950 hover:text-deepblue-700 font-medium">
            Home
          </a>
          <a href="#features" className="text-deepblue-950 hover:text-deepblue-700 font-medium">
            Features
          </a>
          <a href="#books" className="text-deepblue-950 hover:text-deepblue-700 font-medium">
            Books
          </a>
          <a href="#" className="text-deepblue-950 hover:text-deepblue-700 font-medium">
            About
          </a>
        </nav>

        {isLoggedIn ? (
          <div className="hidden md:flex gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-md font-medium"
          >
            Profile Page
          </button>
        </div>):(
        <div className="hidden md:flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-deepblue-950 hover:bg-deepblue-800 text-white px-4 py-2 rounded-md font-medium"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-md font-medium"
        >
          Sign Up
        </button>
      </div>)
        }
        
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <a href="#" className="text-deepblue-950 hover:text-deepblue-700 font-medium py-2">
              Home
            </a>
            <a href="#features" className="text-deepblue-950 hover:text-deepblue-700 font-medium py-2">
              Features
            </a>
            <a href="#books" className="text-deepblue-950 hover:text-deepblue-700 font-medium py-2">
              Books
            </a>
            <a href="#" className="text-deepblue-950 hover:text-deepblue-700 font-medium py-2">
              About
            </a>
            <button className="bg-deepblue-950 hover:bg-deepblue-800 text-white px-4 py-2 rounded-md font-medium w-full">
              Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
