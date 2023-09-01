import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    positions: [],
    roles: [],
    isLoadingGender: false,
    isLoadingPosition: false,
    isLoadingRole: false,
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

        default:
            return state;
    }
}

export default adminReducer;