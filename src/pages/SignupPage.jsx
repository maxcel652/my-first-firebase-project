import React from 'react'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

const SignupPage= () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Create an account
            </h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="name" className="sr-only">
                    Name
                    </label>
                    <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your name"
                    />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
              <p>Have an account? <Link to='/login' className=' text-xl text-gray-300'>Login</Link></p>

              <Button type="submit" className="w-full bg-amber-900">
                Sign Up
              </Button>
            </form>
        </div>
    </div>
  )
}

export default SignupPage