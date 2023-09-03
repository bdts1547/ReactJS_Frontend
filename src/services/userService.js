import axios from "../axios";


const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', {email: email, password: password});
}

const getAllUsers = id => {
    // id=all is get all user
    // id=x get one user
    return axios.get(`/api/get-all-users?id=${id}`);
}

const createNewUser = (data) => {
    return axios.post('/api/create-new-user', { data })
}

const deleteUser = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: id
        }
    })
}

const updateUser = (data) => {
    return axios.put('/api/edit-user', { data })
}

const getAllCode = (type) => {
    return axios.get(`/api/allcode?type=${type}`);
}

const getTopDoctors = (limit) => {
    return axios.get(`api/top-doctors-home?limit=${limit}`);
}

export {
    handleLoginAPI,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getAllCode,
    getTopDoctors,
}