import decode from 'jwt-decode';
import axios from 'axios';
let REST_ENDPOINT = ''
const AUTH_TOKEN_KEY = 'authToken'

export function setRestEndPoint(rest) {
    REST_ENDPOINT = rest
}

export function getRestEndPoint() {
    return REST_ENDPOINT
}

export function logoutUser(callback) {
    axios.post(`${getRestEndPoint()}auth/logout`, { username: getUserInfo().username })
        .then(function () {
            clearAuthToken()
            if (typeof callback === "function") {
                callback()
            }
        })
}

export function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function clearAuthToken() {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn() {
    let authToken = getAuthToken()
    return !!authToken && !isTokenExpired(authToken)
}

export function getUserInfo() {
    if (isLoggedIn()) {
        return decode(getAuthToken())
    }
}

export function getTokenExpirationDate(encodedToken) {
    let token = decode(encodedToken)
    if (!token.exp) return null

    let date = new Date(0)
    date.setUTCSeconds(token.exp)

    return date
}

export function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}