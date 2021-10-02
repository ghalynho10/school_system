import * as actionTYpes from './actionTypes'
import axios from 'axios'


const getAssignmentListStart = () => {
    return {
        type: actionTYpes.GET_ASSIGNMENT_START
    }
}

const getAssignmentListSuccess = assignments => {
    return {
        type: actionTYpes.GET_ASSIGNMENT_SUCCESS,
        assignments: assignments
    }
}

const getAssignmentListFail = error => {
    return {
        type: actionTYpes.GET_ASSIGNMENT_FAIL,
        error: error
    }
}

export const getAssignments = token => {
    return dispatch => {
        dispatch(getAssignmentListStart())
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get("http://127.0.0.1:8000/assignments/")
            .then(response => {
                const assignments = response.data
                dispatch(getAssignmentListSuccess(assignments))
            })
            .catch(err => {
                dispatch(getAssignmentListFail(err))
            })
    }
}


// ASSIGNMENTS DETAIL 

const getAssignmentDetailStart = () => {
    return {
        type: actionTYpes.GET_ASSIGNMENT_DETAIL_START
    }
}

const getAssignmentDetailSuccess = assignment => {
    return {
        type: actionTYpes.GET_ASSIGNMENT_DETAIL_SUCCESS,
        assignment: assignment
    }
}

const getAssignmentDetailFail = error => {
    return {
        type: actionTYpes.GET_ASSIGNMENT_DETAIL_FAIL,
        error: error
    }
}

export const getAssignmentDetail = (token, id) => {
    return dispatch => {
        dispatch(getAssignmentDetailStart())
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://127.0.0.1:8000/assignments/${id}/`)
            .then(response => {
                const assignment = response.data
                dispatch(getAssignmentDetailSuccess(assignment))
            })
            .catch(err => {
                dispatch(getAssignmentDetailFail(err))
            })
    }
}

// CREATE ASSIGNMENTS

const createAssignmentStart = () => {
    return {
        type: actionTYpes.CREATE_ASSIGNMENT_START
    }
}

const createAssignmentSuccess = assignment => {
    return {
        type: actionTYpes.CREATE_ASSIGNMENT_SUCCESS,
        assignment: assignment
    }
}

const createAssignmentFail = error => {
    return {
        type: actionTYpes.CREATE_ASSIGNMENT_FAIL,
        error: error
    }
}

export const createAssignment = (token, assignment) => {
    return dispatch => {
        dispatch(createAssignmentStart())
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post(`http://127.0.0.1:8000/assignments/`, assignment)
            .then(response => {
                dispatch(createAssignmentSuccess())
            })
            .catch(err => {
                dispatch(createAssignmentFail(err))
            })
    }
}