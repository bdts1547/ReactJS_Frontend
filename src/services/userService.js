import axios from "../axios";


const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', {email: email, password: password});
}

const getAllUsers = id => {
    // id=all is get all user, id=x get one user
    return axios.get(`/api/get-all-users?id=${id}`);
}


export {
    handleLoginAPI,
    getAllUsers,
}