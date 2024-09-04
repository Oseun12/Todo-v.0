import axios, { AxiosError } from 'axios';
// import router from 'next/router';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
          const response = await axios.post('/api/auth/Login', { email, password });
          localStorage.setItem('token', response.data.token);
          router.push('/Todolist');
      } catch (error) {
          if (error instanceof AxiosError && error.response && error.response.status === 401) {
              alert('Invalid email or password');
          } else {
              console.error('Login failed:', error);
          }
      }
      
    }


  return (
    <div className="hero min-h-screen bg-black">
  <div className="hero-content flex-col ">
    <div className="text-center">
      <h1 className="text-5xl font-bold text-gray-500">Login!</h1>
      <p className="py-6 text-white max-w-2xl">
      Welcome back! Please log in to access your account and manage your tasks. If you do not have an account yet, sign up and start organizing your to-do list today.

      </p>
    </div>
    
    <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl text-gray-50">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input  type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email" 
            className="input input-bordered" required />
        </div>
        
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input  type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password" 
            className="input input-bordered" required />
          <label className="label">
            <Link href="#" className="label-text-alt link link-hover">Forgot password?</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary ">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
)
}

export default Login;