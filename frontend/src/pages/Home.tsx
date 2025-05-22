// src/pages/Home.tsx
import React from 'react'
import { Link } from 'react-router-dom'
import { FiFeather, FiUsers, FiGlobe } from 'react-icons/fi'

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 flex flex-col">
      {/* Hero */}
      <header className="flex-1 flex flex-col items-center justify-center text-center px-6 py-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-gray-800">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">Solute</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-gray-600 mb-8">
          Your one-stop destination to read, write, and share amazing stories with the world.
        </p>
        <div className="space-x-4">
          <Link
            to="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <FiFeather className="mx-auto text-4xl text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Write with Ease</h3>
            <p className="text-gray-600">
              A powerful rich-text editor that makes drafting your next post a breeze.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <FiUsers className="mx-auto text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Build Your Audience</h3>
            <p className="text-gray-600">
              Share your stories and connect with a community of readers and writers.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition">
            <FiGlobe className="mx-auto text-4xl text-pink-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">
              Publish to the world and discover new voices from every corner of the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-8 bg-blue-600 text-white text-center">
        <p className="mb-4">Ready to start your writing journey?</p>
        <Link
          to="/signup"
          className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-6 rounded-lg transition"
        >
          Write Your First Post
        </Link>
      </footer>
    </div>
  )
}
