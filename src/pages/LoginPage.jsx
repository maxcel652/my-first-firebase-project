import React, { useEffect, useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { isLogin, Login } from '../services/userLogin';
import Spinner from '../components/ui/Spinner';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await Login(email, password);
      if (isLogin) {
        toast.success('Welcome')
        navigate('/');
        console.log('Redirecting to the Todo page');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to login, please check your credentials.')
    }finally{
        setLoading(false)
    }
  };

// returning the spinner
  if(loading){
    return <Spinner/>
  }

  return (
    <>
    {isLogin && (

    <div className="flex items-center justify-center min-h-screen bg-gray-100 max-w-4xl mx-auto px-4 py-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Log in to your account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              type={showPassword? 'text': 'password'}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
              placeholder="Enter your password"
            />
            <button type='button' onClick={()=> setShowPassword(!showPassword)}
                className=' absolute inset-y-0 leading-5 right-0 pr-3 cursor-pointer z-10'    
            >
                {showPassword ? <EyeOff/> : <Eye/>}
            </button>
          </div>


            <p>Do not have an account? create one <Link to='/signup' className=' text-xl text-gray-300'>here</Link></p>

          <Button type="submit" className="w-full bg-amber-900">
            Login
          </Button>
        </form>
      </div>
    </div>
    
    )}
    </>
  );
};

export default LoginPage;