import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    positions: [],
    roles: [],
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
    users: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // GENDER
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
                isLoadingGender: true,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            return {
                ...state,
                genders: action.genders,
                isLoadingGender: false,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
                isLoadingGender: false,
            }


        // POSITION
        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
                isLoadingPosition: true,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            return {
                ...state,
                positions: action.positions,
                isLoadingPosition: false,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            return {
                ...state,
                isLoadingPosition: false,
            }


        // ROLE
        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
                isLoadingRole: true,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            return {
                ...state,
                roles: action.roles,
                isLoadingRole: false,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            return {
                ...state,
                isLoadingRole: false,
            }


        // FETCH ALL USER
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = []
            return {
                ...state,
            }



        // FETCH TOP DOCTOR
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.doctors = action.doctors
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.users = []
            return {
                ...state,
            }


        // FETCH ALL DOCTOR
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.doctors = action.doctors
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.doctors = []
            return {
                ...state,
            }


        // FETCH DOCTOR BY ID
        case actionTypes.FETCH_DOCTOR_BY_ID_SUCCESS:
            state.doctor = action.doctor
            return {
                ...state,
            }
        case actionTypes.FETCH_DOCTOR_BY_ID_FAILED:
            return {
                ...state,
            }


        default:
            return state;
    }
}

export default adminReducer;