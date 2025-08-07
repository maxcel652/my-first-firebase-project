
import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../lib/firebase'; 
import { Button } from '../components/ui/Button';

const SignupPage = () => {
    // useState to manage form input values
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 
    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission and page reload
        setError(null); // Clear any previous errors

        try {
          // create user
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("User signed up successfully!");
            navigate('/'); // Redirect to the home page (or a dashboard) upon successful signup
        } catch (err) {
            setError(err.message);
            console.error("Error signing up:", err.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-center text-3xl font-bold text-gray-900">
                  Create an account
                </h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
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
                          //  Binding input value to state and update on change
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
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
                          autoComplete="new-password" 
                          required
                          // Binding input value to state and update on change
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                          placeholder="Enter your password"
                        />
                    </div>
                    {/* Displaying an error message if Firebase returns one */}
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    <p>Have an account? <Link to='/login' className=' text-xl text-gray-300'>Login</Link></p>
                    <Button type="submit" className="w-full bg-amber-900">
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage;