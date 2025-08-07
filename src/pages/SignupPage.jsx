
import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom'; 
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; 
import { auth } from '../lib/firebase'; 
import { Button } from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { toast } from 'react-toastify';
import { EyeOff, Eye } from 'lucide-react';


const SignupPage = () => {
    // useState to manage form input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLodaing] = useState(false);
    const navigate = useNavigate(); 
    // function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLodaing(true)
        setError(null); 

        try {
          // creating the user
           const userCredentials =  await createUserWithEmailAndPassword(auth, email, password);
           const user = userCredentials.user;

           await updateProfile(user, {
            displayName: name
           });

            console.log("User signed up successfully!");
            toast.success("Account registered successuflly")
            navigate('/'); 
        } catch (err) {
            setError(err.message);
            console.error("Error signing up:", err.message);
            toast.error("An error occured", err.message)
        }finally{
          setLodaing(false)
        }
    };

    // returning the spinner
    if(loading){
      return <Spinner/>
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 max-w-4xl mx-auto px-4 py-8">
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <div className=' relative'>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          id="password"
                          name="password"
                          type={showPassword? 'text' : 'password'}
                          autoComplete="new-password" 
                          required
                          // Binding input value to state and update on change
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                          placeholder="Enter your password"
                        />

                        <button type='button' onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 cursor-pointer z-10"

                          >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
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