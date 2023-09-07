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

const getAllDoctors = () => {
    return axios.get('/api/get-all-doctors');
}

const getDoctorById = (doctorId) => {
    return axios.get(`/api/get-one-doctor?id=${doctorId}`)
}

const createDetailDoctorService = (data) => {
    return axios.post('/api/create-detail-doctor', {data})
}

const editDetailDoctorService = (data) => {
    return axios.put('/api/edit-detail-doctor', {data})
}

export {
    handleLoginAPI,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUser,
    getAllCode,
    getTopDoctors,
    getAllDoctors,
    getDoctorById,
    createDetailDoctorService,
    editDetailDoctorService,
}