'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed w-full z-50 bg-gray-900 bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          ExcaliClone
        </Link>
        <nav className="hidden md:flex space-x-8">
          <NavLink href="/signin">Login</NavLink>
        </nav>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-gray-800 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <NavLink href="#features" onClick={() => setIsMenuOpen(false)}>Features</NavLink>
            <NavLink href="#how-it-works" onClick={() => setIsMenuOpen(false)}>How It Works</NavLink>
            <NavLink href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</NavLink>
            <NavLink href="/signin" onClick={() => setIsMenuOpen(false)}>Login</NavLink>
          </div>
        </nav>
      )}
    </header>
  )
}

const NavLink = ({ href, children, ...props }) => (
  <Link href={href} className="text-gray-300 hover:text-white transition-colors duration-200" {...props}>
    {children}
  </Link>
)

export default Header

