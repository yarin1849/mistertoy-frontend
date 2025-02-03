import { toyService } from "../../services/toy.service.js"

//* Toys
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
// export const SET_FILTER_BY = 'SET_FILTER_BY'
// export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
}

export function toyReducer(state = initialState, cmd = {}) {

    switch (cmd.type) {
        //* Toys
        case SET_TOYS:
            return {
                ...state,
                toys: cmd.toys
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
            return {
                ...state,
                toys: state.toys.map(toy => toy._id === cmd.toy._id ? cmd.toy : toy)
            }
        // case SET_FILTER_BY:
        //     return {
        //         ...state,
        //         filterBy: { ...state.filterBy, ...cmd.filterBy }
        //     }
        // case SET_IS_LOADING:
        //     return {
        //         ...state,
        //         isLoading: cmd.isLoading
        //     }

        default:
            return state
    }
}
