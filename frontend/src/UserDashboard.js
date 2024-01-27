import React, { useEffect, useState } from 'react';
import { isAuthenticated, signout } from './auth';
import { getUser, updateProfile } from './Backend';

const UserDashboard = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        professionalNumber: '',
        enterpriseName: '',
        address: '',
        profileImage: '',
    });

    const { token } = isAuthenticated();

    useEffect(() => {
        getUser(token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUser(data);
            }
        });
    }, [token]);

    const handleChange = name => event => {
        setUser({ ...user, [name]: event.target.value });
    };

    const handleUpdateProfile = () => {
        updateProfile(token, user).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                console.log('Profile updated successfully');
            }
        });
    };

    const handleSignout = () => {
        signout(() => {
            // Redirect or handle signout completion as needed
        });
    };

    return (
        <div>
            <h2>User Dashboard</h2>
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Professional Number: <input type="text" value={user.professionalNumber} onChange={handleChange('professionalNumber')} /></p>
                <p>Enterprise Name: <input type="text" value={user.enterpriseName} onChange={handleChange('enterpriseName')} /></p>
                <p>Address: <input type="text" value={user.address} onChange={handleChange('address')} /></p>
                {/* Add an input for profile image if needed */}
                <button onClick={handleUpdateProfile}>Update Profile</button>
                <button onClick={handleSignout}>Signout</button>
            </div>
        </div>
    );
};

export default UserDashboard;
