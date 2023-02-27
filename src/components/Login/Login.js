import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Login.css';

const Login = () => {

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = event => {

        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log(user);
                form.reset();
                navigate('/');
            })
            .catch(error => console.error(error))

    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>Log in</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p>New to Ema-john? <Link to='/signup'><span> Create New Account</span></Link></p>
        </div>
    );
};

export default Login;