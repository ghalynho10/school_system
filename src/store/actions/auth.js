import * as actionTYpes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTYpes.AUTH_START
    }
}

export const authSuccess = user => {
    return {
        type: actionTYpes.AUTH_SUCCESS,
        user: user
    }
}

export const authFail = error => {
    return {
        type: actionTYpes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('user')
    return {
        type: actionTYpes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expirationTime * 1000);
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart())
        axios.post('http://localhost:8000/rest-auth/login/', {
            username: username,
            password: password
        })
            .then(response => {
                console.log(response.data);

                const user = {
                    token: response.data.key,
                    username,
                    userId: response.data.user,
                    is_student: response.data.user_type.is_student,
                    is_teacher: response.data.user_type.is_teacher,
                    expirationDate: new Date(new Date().getTime() + 3600 * 1000)
                }

                localStorage.setItem('user', JSON.stringify(user))
                dispatch(authSuccess(user))
                dispatch(checkAuthTimeout(3600))
            })
            .catch(error => {
                dispatch(authFail(error))
                console.log(error.response)
            })
    }
}


export const authSignup = (username, email, password1, password2, is_student) => {
    return dispatch => {
        dispatch(authStart())
        const user = {
            username,
            email,
            password1,
            password2,
            is_student,
            is_teacher: !is_student
        }
        axios.post('http://localhost:8000/rest-auth/registration/', user)
            .then(response => {
                const user = {
                    token: response.data.key,
                    username,
                    userId: response.data.user,
                    is_student,
                    is_teacher: !is_student,
                    expirationDate: new Date(new Date().getTime() + 3600 * 1000)
                }

                localStorage.setItem('user', JSON.stringify(user))
                dispatch(authSuccess(user))
                dispatch(checkAuthTimeout(3600))
            })
            .catch(error => {
                dispatch(authFail(error))
                console.log(error.response.data)

            })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user === undefined || user === null) {
            dispatch(authLogout())
        } else {
            const expirationDate = new Date(user.expirationDate)
            if (expirationDate <= new Date()) {
                dispatch(authLogout())
            } else {
                dispatch(authSuccess(user))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}
