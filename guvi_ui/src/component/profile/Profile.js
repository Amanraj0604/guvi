import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from "../Context/ContextProvider"
import axios from 'axios';
import "./profile.css"

const Profile = () => {
  const { state: { user }, dispatch } = useContext(userContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
        const res = await axios.get(`http://localhost:5000/api/users/${user.userInfo._id}`);
          setUserData(res.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

    return (
        <div>
            <div className="profile">
                <div className="profile-left">
                    <img src="https://www.guvi.in/web-build/images/user-profile-bg.d2b2824a59b2baf454ce8f4c7daedc87.svg" alt="" />
                    <div className="edit-img">
                        <img className='img-user1' src="https://s3-ap-southeast-1.amazonaws.com/guvi-profile-images/default.jpg" alt="" />
                        <Link className='img-user2' to={user && `/update/${user.userInfo._id}`}>
                            <img src="https://www.guvi.in/web-build/images/edit-icon.fc1f3146f474a9ac2f7053341a2c1e7d.png" alt="" />
                        </Link>
                    </div>

                    <div className="about-user">
                    {loading ? (
                        <p>Loading user data...</p>
                        ):userData ? (
                            <>
                                <div className="grid-item">
                                    <label htmlFor="">User Name</label>
                                    <h2>{userData.name}</h2>
                                </div>
                                <div className="grid-item">
                                    <label htmlFor="">Email</label>
                                    <p>{userData.email}</p>
                                </div>
                                <div className="grid-item">
                                    <label htmlFor="">Phone </label>
                                    <p>{userData.phone}</p>
                                </div>
                                <div className="grid-item">
                                    <label htmlFor="">Date of Birth</label>
                                    <p>{userData.dob}</p>
                                </div>
                                <div className="grid-item">
                                    <label htmlFor="">City</label>
                                    <p>{userData.city}</p>
                                </div>
                                <div className="grid-item">
                                    <label htmlFor="">Gender</label>
                                    <p>{userData.gender}</p>
                                </div>

                            </>
                        ) : (
                            <p>No data...</p>
                        )}
                        <div className='Logout-but'>
                        <Link  to="/">
                        <button className='logbutt' onClick={handleLogout}>Logout</button>
                        </Link>
                            
                        </div>
                    </div>

                    <img className='foot' src="https://www.guvi.in/web-build/images/user-profile-bg.d2b2824a59b2baf454ce8f4c7daedc87.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Profile
