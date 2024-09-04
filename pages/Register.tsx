import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/auth/Register', { name, email, password }, { headers: { 'Content-Type': 'application/json' } } );
            localStorage.setItem('token', response.data.token);
            router.replace('/Login');
        } catch (error) {
            if (error instanceof AxiosError && error.response && error.response.status === 400) {
                setShowModal(true);
            } else {
                console.error('Register failed:', error);
            }
        }
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-500">Register!</h1>
                    <p className="py-6">
                        Create an account to start managing your tasks efficiently. Stay organized and keep track of your to-do list with ease. Join us today and take the first step towards a more productive you.
                    </p>
                </div>

                <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="name"
                                className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="password"
                                className="input input-bordered" required />
                            <label className="label">
                                <a href="/Login" className="label-text-alt link link-hover">Already have an account?, Login here.</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                    </form>

                    {showModal && (
                        <dialog id="my_modal_2" className="modal" open>
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">User already exists</h3>
                                <p className="py-4">The email you are trying to register with is already in use. Please use another email or log in.</p>
                                <div className="modal-action">
                                    <button className="btn" onClick={() => setShowModal(false)}>Close</button>
                                </div>
                            </div>
                        </dialog>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Register;
