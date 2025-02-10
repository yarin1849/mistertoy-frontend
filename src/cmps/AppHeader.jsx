import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { TOGGLE_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useState } from "react"


// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()
    async function onLogout() {
        try {
            await logout()
            navigate('/')
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
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
                    <NavLink to="/review">Review</NavLink>
                    <a onClick={onToggleCart} href="#">🛒 Cart</a>


                    {!user && <NavLink to="login" className="login-link">Login</NavLink>}

                    {user && (
                        <div className="user-info">
                            <Link to={`user/${user._id}`}>
                                {user.imgUrl && <img src={user.imgUrl} />}
                                {user.fullname}
                            </Link>
                            {/* <span className="score">{user.score?.toLocaleString()}</span> */}
                            <button onClick={onLogout}>logout</button>
                        </div>
                    )}
                </nav>
            </section>
            {/* {user ? (
                < section >
                    <span to={`/user/${user._id}`}>Hello {user.fullname} <span>${user.score.toLocaleString()}</span></span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup />
                </section>
            )} */}
            <UserMsg />
        </header>
    )
}
