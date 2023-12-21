import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import "./form.css";


const Form = () => {
    let { userId } = useParams();
    const [message, setMessage] = useState(null); 
    
    // console.log(userId);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        city: '',
        gender: 'male'
      });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)

            });

            if (response.ok) {
                setMessage('User data updated successfully!');
                
            } else {

                console.error('Failed to update user data.');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div>
            <div className="form-box">
                <img src="https://www.guvi.in/web-build/images/user-profile-bg.d2b2824a59b2baf454ce8f4c7daedc87.svg" alt="" />
                <Link className='close-but' to="/profile"><button className='close-but'>Close</button></Link>
                <div className="form-right">
                    <br />
                    {message && <div>
                        <div className="pupuop">
                                <p className='pop-p1'>{message}</p>
                                <p ><Link className='pop-p2' to="/profile">Ok</Link></p>
                            </div>
                        </div>}
                        
                    <form onSubmit={handleSubmit}>
                        <label className="label" htmlFor="Email">User Name</label>
                        <input className='input-form'
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange} />
                        <label className="label" htmlFor="">Email Address</label>
                        <input className='input-form'
                            type="text"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange} />
                        <label className="label" htmlFor="">Phone </label>
                        <input className='input-form'
                            type="text"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange} />
                        <label className="label" htmlFor="">Date of Birth</label>
                        <input className='input-form'
                            type="Date"
                            name="dob"
                            value={userData.dob}
                            onChange={handleInputChange} />
                        <label className="label" htmlFor="">City</label>
                        <input className='input-form'
                            type="text"
                            name="city"
                            value={userData.city}
                            onChange={handleInputChange} />
                        <label className="label" htmlFor="gender">Gender</label>
                        <select
                            className='input-form'
                            id="gender"
                            name="gender" 
                            value={userData.gender} 
                            onChange={handleInputChange} 
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <button className='save-but'type="submit">Save</button>
                        
                        
                        
                    </form>
                </div>
                <img src="https://www.guvi.in/web-build/images/user-profile-bg.d2b2824a59b2baf454ce8f4c7daedc87.svg" alt="" />
            </div>
        </div>
    )
}

export default Form
