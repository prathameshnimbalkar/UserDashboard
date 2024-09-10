import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import {Sidebar} from '../Sidebar/Sidebar';
import { useNavigation } from '../Helper/NavigationContext'

interface User {
  age: number;
  branch: string;
  collegename: string;
  gender: string;
  location: string;
  name: string;
  relation: string;
  spocname: string;
  id: number;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


  const { setData, setEdit } = useNavigation();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://66d58feff5859a7042669345.mockapi.io/api/user/');
        setUserData(response.data);
        setEdit(false)
        
      } catch (err) {
        console.error('Failed to fetch user data', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

  },[]);

  const DeleteData = async () => {
    setLoadingId(selectedUserId);

    try {
      const response = await axios.delete(`https://66d58feff5859a7042669345.mockapi.io/user/${selectedUserId}`);
      const deletedId = response.data.id;
      console.log(deletedId);
      setUserData(prevUserData => 
        prevUserData.filter(user => user.id !== deletedId)
      );
    } catch (err) {
      console.error('Failed to delete', err);
    } finally {
      setLoadingId(null);
      setShowPopup(false);
      setSelectedUserId(null);
    }
  };

  const EditData = async (userId: number) => {
    const user = userData.find(u => u.id === userId);
    
    if (user) {
      const formData = {
        id: user.id,
        name: user.name,
        gender: user.gender,
        age: user.age,
        branch: user.branch,
        collegeName: user.collegename,
        location: user.location,
        relation: user.relation,
        SpocName: user.spocname,
      };
      // console.log(formData)
      setData(formData);
      setEdit(true);
      navigate('/one');

      // console.log("Form data updated:", formData);
    } else {
      console.error("User not found");
    }
  };

  const handleConfirmDelete = () => {
    setShowPopup(false);
    DeleteData();
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setSelectedUserId(null);
  };

  if (isLoading) {
    return (
      <div className='main-loading'>
        <Sidebar />
        <div className='loading'>Loading user data...</div>
      </div>
    );
  }

  if (!userData.length) {
    return <div>No user data available.</div>;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className='profile-container'>
        <h2>User Details</h2>
        <div className='details-section'>
          {userData.map((user) => (
            <div key={user.id} className='user-details' onClick={() => setSelectedUserId(user.id)}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Branch:</strong> {user.branch}</p>
              <p><strong>College Name:</strong> {user.collegename}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Location:</strong> {user.location}</p>
              <p><strong>Relation:</strong> {user.relation}</p>
              <p><strong>SPOC Name:</strong> {user.spocname}</p>
              <div className='action'>
                <button 
                  className={`delete ${loadingId === user.id ? 'del-loading' : ''}`} 
                  onClick={() => setShowPopup(true)}
                  disabled={loadingId === user.id}
                >
                  {loadingId === user.id ? <span className="spinner"></span> : 'Delete'}
                </button>

                <button className='edit' onClick={() => EditData(user.id)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
      <div className="popup-overlay">
        <div className="popup">
          <div className="popup-header">Confirm Delete
          </div>
          <div className="button-group">
            <button className="confirm-button" onClick={handleConfirmDelete}>
              Yes
            </button>
            <button className="cancel-button" onClick={handleCancelDelete}>
              No            </button>
          </div>
        </div>
      </div>
    )}

    </div>

    

    
  );  
};

export default Profile;
