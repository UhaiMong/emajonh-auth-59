import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import './Login.css'

const Login = () => {
    const { signIn, singUpWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const submitHandler = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                navigate(from, { replace: true });
                console.log(user);
            })
            .catch(error => console.error(error))

    }
    const signInGoogleHandler = () => {
        singUpWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user);
            })
            .catch(error => console.error(error))
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login </h2>
            <form onSubmit={submitHandler}>
                <div className='form-body'>
                    <div className="form-control">
                        <label htmlFor=''>Email</label>
                        <input type="email" name="email" placeholder='Email' required />
                    </div>

                    <div className="form-control">
                        <label htmlFor=''>Password</label>
                        <input type="password" name="password" />
                    </div>

                    <div className='btn-submit'>
                        <button>Login</button>
                    </div>

                    <p className='link-regi'><small>New to Ema-john?<Link to='/signup'> Create a new account </Link></small></p>
                    <div className='btn-submit-google'>
                        <button onClick={signInGoogleHandler} className='btn-google'>Continue with Google</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;