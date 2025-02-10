import { userService } from "../../services/user.service.js"
import { store } from "../store.js"
import { SET_IS_LOADING } from '../reducers/toy.reducer.js'
import { SET_USER, SET_USERS } from "../reducers/user.reducer.js"

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
    }
    catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}


export async function signup(credentials) {
    try {
        const user = userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })

    }
    catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}


export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch (error) {
        console.log('user actions -> Cannot logout', error)
        throw error
    }
}

export async function loadUsers() {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export function checkout(diff) {
    return userService.updateScore(-diff)
        .then((newScore) => {
            // store.dispatch({ type: CLEAR_CART })
            store.dispatch({ type: SET_USER_SCORE, score: newScore })
        })
        .catch((err) => {
            console.log('user actions -> Cannot checkout', err)
            throw err
        })
}



