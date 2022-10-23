import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/UserContext';
import './Signup.css'

const Signup = () => {
    const [error, setError] = useState('');
    const { createUser } = useContext(AuthContext);
    const submitHandler = event => {
        event.preventDefault();
        const form = event.target;
        const userName = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPass = form.confirm.value;
        if (password.length < 6) {
            setError('Password should be 6 characters or more.');
            return;
        }
        if (password !== confirmPass) {
            setError(`Password doesn't match`);
            return;
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                form.reset();
                console.log(user);
            })
            .catch(error => console.error(error))
        console.log(userName, email, password, confirmPass);
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign up </h2>
            <form onSubmit={submitHandler}>
                <div className='form-body'>
                    <div className="form-control">
                        <label htmlFor=''>User Name</label>
                        <input type="text" name="name" placeholder='User Name' required />
                    </div>

                    <div className="form-control">
                        <label htmlFor=''>Email</label>
                        <input type="email" name="email" placeholder='Email' required />
                    </div>

                    <div className="form-control">
                        <label htmlFor=''>Password</label>
                        <input type="password" name="password" placeholder='Password' />
                    </div>

                    <div className="form-control">
                        <label htmlFor=''>Confirm password</label>
                        <input type="password" name="confirm" placeholder='Confirm password' />
                    </div>

                    {error ? <span className='error-text'>{error}</span> : <span className='success-text'>Successfully done</span>}

                    <div className='btn-submit'>
                        <button>Signup</button>
                    </div>

                    <p className='link-regi'><small>Already have an account?<Link to='/login'> Go to login </Link></small></p>
{/* 
                    <div className='btn-submit-google'>
                        <button className='btn-google'>Continue with Google</button>
                    </div> */}
                </div>
            </form>
        </div>
    );
};

export default Signup;