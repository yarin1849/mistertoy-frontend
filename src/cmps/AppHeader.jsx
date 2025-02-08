import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useState } from "react"


// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    const dispatch = useDispatch()
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('logout successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }



    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: TOGGLE_CART_IS_SHOWN })
    }

    function onToggleMenu() {
        // console.log('prevStateBefore', prevState)
        setIsMenuOpen(prevState => !prevState)
        // console.log('prevStateAfter', prevState)
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Toy App</h1>
                <button className='menu-btn' onClick={onToggleMenu}>☰</button>
                <nav className={`app-nav${isMenuOpen ? '-open' : ''}`}>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >dashboard</NavLink>
                    <a onClick={onToggleCart} href="#">🛒 Cart</a>
                </nav>
            </section>
            {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )}
            <UserMsg />
        </header>
    )
}
