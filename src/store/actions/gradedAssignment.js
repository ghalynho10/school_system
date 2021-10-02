import * as actionTYpes from './actionTypes'
import axios from 'axios'


const getGradedAssignmentListStart = () => {
    return {
        type: actionTYpes.GET_GRADED_ASSIGNMENT_START
    }
}

const getGradedAssignmentListSuccess = assignments => {
    return {
        type: actionTYpes.GET_GRADED_ASSIGNMENT_SUCCESS,
        assignments: assignments
    }
}

const getGradedAssignmentListFail = error => {
    return {
        type: actionTYpes.GET_GRADED_ASSIGNMENT_FAIL,
        error: error
    }
}

export const getGradedAssignments = (token, username) => {
    return dispatch => {
        dispatch(getGradedAssignmentListStart())
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.get(`http://127.0.0.1:8000/graded-assignments/?username=${username}`)
            .then(response => {
                const assignments = response.data
                dispatch(getGradedAssignmentListSuccess(assignments))
            })
            .catch(err => {
                dispatch(getGradedAssignmentListFail(err))
            })
    }
}


// GRADED ASSIGNMENT



export const createGradedAssignment = (token, assignment) => {
    return dispatch => {
        // dispatch(createAssignmentStart())
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post(`http://127.0.0.1:8000/graded-assignments/create/`, assignment)
            .then(response => {
                console.log(response.data);

                // dispatch(createAssignmentSuccess())
            })
            .catch(err => {
                console.log(err.response.data);
                // dispatch(createAssignmentFail(err))
            })
    }
}

