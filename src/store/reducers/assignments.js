import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    assignments: [],
    currentAssignment: {},
    error: null,
    loading: false
}

const getAssignmentListStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const getAssignmentListSuccess = (state, action) => {
    return updateObject(state, {
        assignments: action.assignments,
        error: null,
        loading: false
    })
}

const getAssignmentListFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

// ASSIGNMENT DETAIL


const getAssignmentDetailStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const getAssignmentDetailSuccess = (state, action) => {
    return updateObject(state, {
        currentAssignment: action.assignment,
        error: null,
        loading: false
    })
}

const getAssignmentDetailFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}



// CREATE ASSIGNMENTS

const createAssignmentStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    })
}

const createAssignmentSuccess = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: false
    })
}

const createAssignmentFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ASSIGNMENT_START: return getAssignmentListStart(state, action)
        case actionTypes.GET_ASSIGNMENT_SUCCESS: return getAssignmentListSuccess(state, action)
        case actionTypes.GET_ASSIGNMENT_FAIL: return getAssignmentListFail(state, action)

        case actionTypes.GET_ASSIGNMENT_DETAIL_START: return getAssignmentDetailStart(state, action)
        case actionTypes.GET_ASSIGNMENT_DETAIL_SUCCESS: return getAssignmentDetailSuccess(state, action)
        case actionTypes.GET_ASSIGNMENT_DETAIL_FAIL: return getAssignmentDetailFail(state, action)

        case actionTypes.CREATE_ASSIGNMENT_START: return createAssignmentStart(state, action)
        case actionTypes.CREATE_ASSIGNMENT_SUCCESS: return createAssignmentSuccess(state, action)
        case actionTypes.CREATE_ASSIGNMENT_FAIL: return createAssignmentFail(state, action)
        default:
            return state
    }
}

export default reducer