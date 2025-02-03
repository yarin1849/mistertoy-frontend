import { userService } from "../../services/user.service.js"


//* Count
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'

//* Cars
export const SET_CARS = 'SET_CARS'
export const REMOVE_CAR = 'REMOVE_CAR'
export const ADD_CAR = 'ADD_CAR'
export const UPDATE_CAR = 'UPDATE_CAR'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_SCORE = 'SET_USER_SCORE'

//* Shopping cart
export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
export const ADD_CAR_TO_CART = 'ADD_CAR_TO_CART'
export const REMOVE_CAR_FROM_CART = 'REMOVE_CAR_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'


const initialState = {
    count: 101,
    loggedInUser: userService.getLoggedinUser(),

}

export function userReducer(state = initialState, cmd = {}) {

    switch (cmd.type) {
        case INCREMENT:
            return { ...state, count: state.count + 1 }
        case DECREMENT:
            return { ...state, count: state.count - 1 }
        case CHANGE_BY:
            return { ...state, count: state.count + cmd.diff }



        case SET_USER:
            return {
                ...state,
                loggedInUser: cmd.user
            }
        case SET_USER_SCORE:
            const loggedInUser = { ...state.loggedInUser, score: cmd.score }
            return { ...state, loggedInUser }



        default:
            return state
    }
}
