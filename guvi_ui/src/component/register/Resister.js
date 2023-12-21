
import React, { useState, } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Resister = () => {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnfpassword, setCnfpassword] = useState('');
  const [error, setError] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
        cnfpassword,
      });

      alert('Registered New User Successfully');
      res.data && window.location.replace('/');

    } catch (error) {
      setError(true);
      alert('Something Went Wrong!');
    }
  };

  return (
    <div>
      <div className="login">
        <div className="login-left">
          <img src="https://cdn.dribbble.com/userupload/8047717/file/original-33bbccbb81bd5900b119e92f53cd0e83.jpg?resize=752x" alt="" />
        </div>
        <div className="login-right">
          <h1>Sign up</h1>
          <p>Already have an account? <span className='span-text'><Link to="/">Login</Link></span></p>
          <form onSubmit={handleSubmit}>
            <label className="label1" htmlFor="Email">User Name</label>
            <input className='input-data' type="text" onChange={(e) => setName(e.target.value)} />
            <label className="label1" htmlFor="Email">Email Address</label>
            <input className='input-data' type="text" onChange={(e) => setEmail(e.target.value)} />
            <label className="label1" htmlFor="">Password</label>
            <input className='input-data' type="password" onChange={(e) => setPassword(e.target.value)} />
            <label className="label1" htmlFor="">Confirm Password</label>
            <input className='input-data' type="password" onChange={(e) => setCnfpassword(e.target.value)} />
            <button className='user-but' type='submit'>Sign up</button>
          </form>
          {error && <span >
            <p className='pop-p'>Invalid user format or password: It should be at least 8 characters long and contain at least 1 special character.'</p>
          </span>}
        </div>
      </div>
    </div>
  );
};

export default Resister;
