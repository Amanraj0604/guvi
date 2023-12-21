

import '../login/login.css';
import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../Context/ContextProvider';
import axios from 'axios';

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const { dispatch, state } = useContext(userContext);
  const { isFetching } = state;
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    dispatch({ type: 'LOGIN_START' });

    try {
        const res = await axios.post('http://localhost:5000/api/users/login', {
            email: userRef.current.value,
            password: passwordRef.current.value,
        });
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data}); 
        console.log(res.data)
        // dispatch(res.data)
        navigate("/profile");
    } catch (err) {
        setError(true);
        dispatch({ type: 'LOGIN_FAILURE' });
    }
};
  console.log(isFetching);
  
  return (
    <div>
      <div className="login">
        <div className="login-left">
          <img src="https://www.guvi.in/blog/wp-content/uploads/2021/12/Twitter-post-1-2048x1152.png" alt="" />
        </div>
        <div className="login-right">
        {isFetching && <span className='notification'>Login Succusfuly</span>}
          <h1>Login</h1>
          <p>Don't have an account? <span className='span-text'>
              <Link to="/resister">Sign up</Link>
            </span></p>
            
            
          <form  onSubmit={handleSubmit}>
            <label className="label1" htmlFor="Email">Email Address</label>
            <input className='input-data' type="text" ref={userRef}/>
            <label className="label1" htmlFor="">Password</label>
            <input className='input-data' type="password" ref={passwordRef} />
            <button className='user-but' type="submit"disabled={isFetching}>Login</button>
            {error && <span className='error'>Invalid User and Password!</span>}
            

          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
