import actionTypes from './actionTypes';
import {
    createNewUser, getAllCode, getAllUsers, deleteUser, updateUser, getTopDoctors,
    getAllDoctors, getDoctorById, createDetailDoctorService, editDetailDoctorService,
    bulkCreateScheduleService, getDoctorScheduleByDate,
} from '../../services/userService';
import { toast } from 'react-toastify';

// FETCH DATA GENDER
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            const res = await getAllCode('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log("fetchGenderFailed error", error);

        }
    }

}

export const fetchGenderSuccess = (genders) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    genders: genders,
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})



// FETCH DATA POSITION
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_POSITION_START });
            const res = await getAllCode('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log("fetchPositionFailed error", error);

        }
    }

}

export const fetchPositionSuccess = (positions) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    positions: positions,
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})



// FETCH DATA ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ROLE_START });
            const res = await getAllCode('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log("fetchRoleFailed error", error);

        }
    }

}

export const fetchRoleSuccess = (roles) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    roles: roles,
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


// FETCH_SCHEDULE_TIME_SUCCESS
export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllCode('TIME');
            if (res && res.errCode === 0) {
                dispatch({ 
                    type: actionTypes.FETCH_SCHEDULE_TIME_SUCCESS ,
                    dataTime: res.data
                });
            } else {
                dispatch({ type: actionTypes.FETCH_SCHEDULE_TIME_FAILED });
                console.log(res.message);
            }
        } catch (error) {
            toast.error(error);
            dispatch({ type: actionTypes.FETCH_SCHEDULE_TIME_FAILED });
            console.log('getAllScheduleTime error', error);
        }
    }
}




// CREATE USER
export const createNewUserRedux = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await createNewUser(data);
            if (res && res.errCode === 0) {
                toast.success('Create user successful!');
                dispatch(createUserSuccess());
                dispatch(fetchAllUserRedux()); // update state redux to re-render
            } else {
                toast.error(res.message);
                dispatch(createUserFailed());
            }
        } catch (error) {
            dispatch(createUserFailed());
            console.log('createUserFailed error', error);
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})



// FETCH ALL USER 
export const fetchAllUserRedux = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users));
            } else {
                dispatch(fetchGenderFailed());
                console.log(res.message);
            }
        } catch (error) {
            dispatch(fetchAllUserFailed());
            console.log('fetchAllUserFailed error', error);
        }
    }
}

export const fetchAllUserSuccess = (users) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: users
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})



// EDIT USER
export const editUserRedux = (user) => {
    return async (dispatch, getState) => {
        try {
            const res = await updateUser(user);
            if (res && res.errCode === 0) {
                toast.success('Edit user successful!')
                dispatch(editUserSuccess());
                dispatch(fetchAllUserRedux());
            } else {
                dispatch(editUserFailed());
                console.log(res.message);
            }
        } catch (error) {
            dispatch(editUserFailed());
            console.log('editUserFailed error', error);
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})



// DELELE USER BY ID 
export const deleteUserRedux = (userId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteUser(userId);
            if (res && res.errCode === 0) {
                toast.success('Delete user successful!')
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserRedux());
            } else {
                dispatch(deleteUserFailed());
                console.log(res.message);
            }
        } catch (error) {
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', error);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})



// FETCH TOP DOCTOR HOME
export const fetchTopDoctors = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getTopDoctors(10);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(res.doctors));
            } else {
                dispatch(fetchTopDoctorsFailed());
                console.log(res.message);
            }
        } catch (error) {
            dispatch(fetchTopDoctorsFailed());
            console.log('fetchTopDoctors error', error);
        }
    }
}

export const fetchTopDoctorsSuccess = (doctors) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    doctors: doctors,
})

export const fetchTopDoctorsFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
})


// FETCH ALL DOCTOR
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    doctors: res.doctors
                });
            } else {
                dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED });
                console.log(res.message);
            }
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_ALL_DOCTOR_FAILED });
            console.log('fetchAllDoctors error', error);
        }
    }
}



// FETCH_DOCTOR_BY_ID
export const fetchDoctorById = (id) => {
    return async (dispatch, getState) => {
        try {
            const res = await getDoctorById(id);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_BY_ID_SUCCESS,
                    doctor: res.doctor,
                });
            } else {
                dispatch({ type: actionTypes.FETCH_DOCTOR_BY_ID_FAILED });
                console.log(res.message);
            }
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_DOCTOR_BY_ID_FAILED });
            console.log('fetchDoctorById error => ', error);
        }
    }
}



// CREATE DETAIL DOCTOR
export const createDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await createDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success(res.message);
                dispatch({ type: actionTypes.CREATE_DETAIL_DOCTOR_SUCCESS });
            } else {
                toast.error(res.message);
                dispatch({ type: actionTypes.CREATE_DETAIL_DOCTOR_FAILED });
                console.log(res.message);
            }
        } catch (error) {
            toast.error(error);
            dispatch({ type: actionTypes.CREATE_DETAIL_DOCTOR_FAILED });
            console.log('createDetailDoctor error', error);
        }
    }
}



// CREATE DETAIL DOCTOR
export const editDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await editDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success(res.message);
                dispatch({ type: actionTypes.EDIT_DETAIL_DOCTOR_SUCCESS });
            } else {
                toast.error(res.message);
                dispatch({ type: actionTypes.EDIT_DETAIL_DOCTOR_FAILED });
                console.log(res.message);
            }
        } catch (error) {
            toast.error(error);
            dispatch({ type: actionTypes.EDIT_DETAIL_DOCTOR_FAILED });
            console.log('editDetailDoctor error', error);
        }
    }
}


// bulk Create Schedule Doctor
export const bulkCreateSchedule = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await bulkCreateScheduleService(data);
            if (res && res.errCode === 0) {
                toast.success(res.message);
                dispatch({ type: actionTypes.BULK_CREATE_SCHEDULE_SUCCESS });
            } else {
                toast.error(res.message);
                dispatch({ type: actionTypes.BULK_CREATE_SCHEDULE_FAILED });
                console.log(res.message);
            }
        } catch (error) {
            toast.error(error);
            dispatch({ type: actionTypes.BULK_CREATE_SCHEDULE_FAILED });
            console.log('bulkCreateSchedule error', error);
        }
    }
}




// FETCH_DOCTOR_SCHEDULE_BY_ID
export const fetchDoctorScheduleById = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            const res = await getDoctorScheduleByDate(doctorId, date);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_DOCTOR_SCHEDULE_BY_DATE_SUCCESS,
                    doctorSchedule: res.data,
                });
            } else {
                dispatch({ type: actionTypes.FETCH_DOCTOR_SCHEDULE_BY_DATE_FAILED });
                console.log(res.message);
            }
        } catch (error) {
            dispatch({ type: actionTypes.FETCH_DOCTOR_SCHEDULE_BY_DATE_FAILED });
            console.log('fetchDoctorScheduleById error => ', error);
        }
    }
}
