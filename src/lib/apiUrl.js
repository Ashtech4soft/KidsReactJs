import axios from "axios";

// export const BASE_URL = "http://localhost:4000/";
export const BASE_URL = "https://kidsnodejs.onrender.com/";

// Function to get the token dynamically
const getToken = () => {
    return (
        localStorage.getItem("Adtoken") ||
        localStorage.getItem("Utoken") ||
        localStorage.getItem("Suptoken") ||
        localStorage.getItem("Chatoken") ||
        localStorage.getItem("Cotoken") ||
        ""
    );
};



// Default API instance
export const apiUrl = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

// Authenticated API instance with dynamic token
export const authApiUrl = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
    withCredentials: true,
});