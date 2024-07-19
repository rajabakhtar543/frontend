import React, { useState, useEffect } from 'react';
import './UserDetails.css';
import { useAuth } from '../../../Context/auth';
import axios from 'axios'; // Assuming you're using axios for API calls
import toast from 'react-hot-toast';

function UserDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [Auth, setAuth] = useAuth();

  useEffect(() => {
    const { email, name, address, phone } = Auth?.user;
    setName(name);
    setEmail(email);
    setAddress(address);
    setPhone(phone);
  }, [Auth?.user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'address':
        setAddress(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put('/api/v1/auth/update-profile', { name, address,email,phone });
        if (data?.error) {
          toast.error(data.error);
        } else {
          setAuth({
            ...Auth,
            user: data?.updatedUser
          });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("Profile Updated Successfully");
          setIsEditing(false)
        }
      } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong');
      }
    };

  return (
    <div className="user-details">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="user-info">
          <div className="info-item">
            <label htmlFor="name" className='mt-3'>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="info-item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              readOnly
            />
          </div>
          <div className="info-item">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div className="info-item">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
        </div>
        {isEditing ? (
          <div className="button-group">
            <button type="submit" className="btn save-btn">Save</button>
            <button type="button" className="btn cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <button type="button" className="btn edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </form>
    </div>
  );
}

export default UserDetails;