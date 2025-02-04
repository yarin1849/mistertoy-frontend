import { toyService } from "../../services/toy.service.js"

//* Toys
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

//* Shopping cart
export const TOGGLE_CART_IS_SHOWN = 'TOGGLE_CART_IS_SHOWN'
export const ADD_TOY_TO_CART = 'ADD_TOY_TO_CART'
export const REMOVE_TOY_FROM_CART = 'REMOVE_TOY_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'

const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
    shoppingCart: [],
    isCartShown: false,

}

export function toyReducer(state = initialState, cmd = {}) {

    switch (cmd.type) {
        //* Toys
        case SET_TOYS:
            console.log('cmd.toys.toys', cmd.toys.toys)
            return {
                ...state,
                toys: cmd.toys.toys
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, cmd.toy]
            }
        case REMOVE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy => toy._id !== cmd.toyId),
                lastToys: [...state.toys]
            }
        case UPDATE_TOY:
            toys = state.toys.map(toy =>
                toy._id === action.toy._id ? action.toy : toy
            )
            return { ...state, toys, lastToys: state.toys }
        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: cmd.isLoading
            }

        //*Cart
        case TOGGLE_CART_IS_SHOWN:
            return {
                ...state,
                isCartShown: !state.isCartShown
            }
        case ADD_TOY_TO_CART:
            return {
                ...state,
                shoppingCart: [...state.shoppingCart, cmd.car]
            }

        case REMOVE_TOY_FROM_CART:
            const shoppingCart = state.shoppingCart.filter(car => car._id !== cmd.carId)
            return { ...state, shoppingCart }

        case CLEAR_CART:
            return { ...state, shoppingCart: [] }

        default:
            return state
    }
}
