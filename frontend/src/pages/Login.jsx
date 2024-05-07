import { useState, useEffect } from 'react';
import { login, clearError } from '../features/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.account.loading);
    const resError = useSelector((state) => state.account.error);
    const success = useSelector((state) => state.account.success);
    const navigate = useNavigate();

    useEffect(() => {
    if (localStorage.getItem('account')) {
        navigate('/dashboard');
    }
    }, [navigate]);

    if (success) {
        navigate('/dashboard');
    }

    const handleLogin = () => {
        if (!email || !password) {
            setError('Please enter both email and password');
        } else {
            dispatch(login({ email, password }));
            
            setError('');
        }
    };

    const handleEmailChange = (event) => {
        setError('');
        dispatch(clearError());
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setError('');
        dispatch(clearError());
        setPassword(event.target.value);
    };

    return (
        <div className="login-container">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <label className="input input-bordered flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                <input required type="email" className="grow" placeholder="Email" value={email}
                    onChange={(e) => handleEmailChange(e)} />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                <input required type="password" className="grow" placeholder="Password" value={password}
                    onChange={(e) => handlePasswordChange(e)} />
            </label>
            <button disabled={loading} type="button" onClick={handleLogin} className="group relative inline-block focus:outline-none focus:ring mb-4">
                <span
                    className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                ></span>
                <span
                    className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
                >
                    Login
                </span>
            </button>

            {error && <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                <strong className="block font-medium text-red-800"> Something went wrong </strong>
                <p className="mt-2 text-sm text-red-700">
                    {error}
                </p>
            </div>}
            {resError && <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                <strong className="block font-medium text-red-800"> Something went wrong </strong>
                <p className="mt-2 text-sm text-red-700">
                    {resError}
                </p>
            </div>}
        </div>
    );
};

export default Login;
