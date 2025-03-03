// const Router = ReactRouterDOM.BrowserRouter
// // const Router = ReactRouterDOM.HashRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux
import './assets/style/main.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { store } from './store/store.js'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { LoginSignup } from './pages/loginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/signUp.jsx'


export function App() {

  return (
    <Provider store={store}>
      <Router>
        <section className="app">
          <AppHeader />
          <main className='main-layout'>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<Dashboard />} path='/dashboard' />
              {/* <Route element={<ToyEdit />} path="/toy/edit" /> */}
              <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
              <Route element={<ToyDetails />} path="/toy/:toyId" />
              <Route path="review" element={<ReviewIndex />} />
              <Route element={<UserDetails />} path="/user/:userId" />
              <Route path="login" element={<LoginSignup />}>
                <Route index element={<Login />} />
                <Route path="signup" element={<Signup />} />
              </Route>
            </Routes>
          </main>
          <AppFooter />
        </section>
      </Router>
    </Provider>

  )
}


