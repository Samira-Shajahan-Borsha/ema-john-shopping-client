import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
const SignUp = () => {
    return (
        <div className='form-container'>
            <h1 className='form-title'>Sign Up</h1>
            <form>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="" required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p>Already have an account? <Link to='/login'><span>  Login</span></Link></p>
        </div>
    );
};

export default SignUp;