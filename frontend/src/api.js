import axios from 'axios';

// Fetch user information
export const getUser = (token) => {
    return axios.get("http://localhost:8000/api/user", {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.data)
    .catch(err => err.response.data);
};

// Update user profile
export const updateProfile = (token, userData) => {
    return axios.put("http://localhost:8000/api/user/updateProfile", JSON.stringify(userData), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.data)
    .catch(err => err.response.data);
};
