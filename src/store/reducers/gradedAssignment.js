import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    assignments: [],
    error: null,
    loading: false
}

const getGradedAssignmentListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const getGradedAssignmentListSuccess = (state, action) => {
    return updateObject(state, {
        assignments: action.assignments,
        error: null,
        loading: false
    })
}

const getGradedAssignmentListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_GRADED_ASSIGNMENT_START: return getGradedAssignmentListStart(state, action)
        case actionTypes.GET_GRADED_ASSIGNMENT_SUCCESS: return getGradedAssignmentListSuccess(state, action)
        case actionTypes.GET_GRADED_ASSIGNMENT_FAIL: return getGradedAssignmentListFail(state, action)
        default:
            return state
    }
}

export default reducer