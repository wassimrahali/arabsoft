import axios from 'axios';

//SIGNIN
export const signin = user => {
    return axios.post("http://localhost:8000/api/signin", JSON.stringify(user), {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => response.data)
    .catch(err => err.response.data);
};

//SIGNUP
export const signup = user => {
    return axios.post("http://localhost:8000/api/signup", JSON.stringify(user),{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
    .then(response => response.data)
    .catch(err => err.response.data);
};

//SETTING THE JWT TOKEN IN USER'S BROWSER
export const authenticate = (data, next) => {
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

//SIGNOUT -> REMOVING JWT TOKEN
export const signout = (next) => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");

        axios.get("http://localhost:8000/api/signout")
        .then(response => {
            console.log(response.data); 
            next(); 
        })
        .catch(err => console.log(err));
    }
};

//VALIDATION IF USER IS SIGNED IN
export const isAuthenticated = () => {
    if (typeof window === "undefined") {
        return false;
    }
    if(localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};
