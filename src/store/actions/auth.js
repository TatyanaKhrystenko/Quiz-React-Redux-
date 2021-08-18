import axios from "axios"
import { AUTH_LOGOUT, AUTH_SUCCESS } from "./actionTypes"

export default function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
      
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyALxndmdTlXHBFaRLkvFURtjDxKspnXxM4'

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyALxndmdTlXHBFaRLkvFURtjDxKspnXxM4'
        }
            const response = await axios.post(url, authData)
            const data = response.data

            const expiratonDate = new Date (new Date().getTime() + data.expiresIn * 1000)

            localStorage.setItem('token', data.idToken)
            localStorage.setItem('userId', data.localId)
            localStorage.setItem('expiratonDate', expiratonDate)

            dispatch(authSuccess(data.idToken))
            dispatch (autoLogout(data.expiresIn))
    }
}

export  function autoLogout(time) {
    return dispatch => {
        setTimeout( () => {
            dispatch (logout())
        }, time * 1000)
    }
}

export function logout(){
    localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('expiratonDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date (localStorage.getItem('expiratonDate'))
            if (expirationDate <= new Date()) {
                dispatch (logout())
            } else {
                dispatch(authSuccess(token))
                dispatch (autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export  function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}