import React, { useEffect } from 'react'
import styles from '../styles/header.module.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import { useState } from 'react'

const Header = (props) => {
  const [userMenu, setUserMenu] = useState(false)
  useEffect(() => {
    props.verifyToken()
    // eslint-disable-next-line
  }, [])
  window.onclick = (e) => e.target.id !== 'userMenu' && setUserMenu(false)

  return (
    <header>
      <nav className={styles.containerNavegation}>
        <img className={styles.logo} src='/assets/logo-cocina-prueba.png' alt='logo' />
        <div className={styles.navegation}>
          <NavLink exact activeClassName={styles.active} to='/'>
            Home
          </NavLink>
          <NavLink activeClassName={styles.active} to='/product'>
            Platos
          </NavLink>
          <NavLink to='/'>Promos</NavLink>
          <NavLink to='/'>Pedidos</NavLink>
          <NavLink activeClassName={styles.active} to='/contact'>
            Contacto
          </NavLink>
        </div>
        <div className={styles.userData} onClick={() => setUserMenu(true)}>
          {props.user && <h2>{props.user.firstName}</h2>}
          <img id='userMenu' className={styles.user} src={props.user ? props.user.src : '/assets/user.png'} alt='logo' />
        </div>
        {userMenu && (
          <div className={styles.userMenuContainer}>
            <div className={styles.userMenu}>
              {!props.user ? (
                <>
                  <NavLink to='/sign-forms/signin'>Sign In</NavLink>
                  <NavLink to='/sign-forms/signup'>Sign Up</NavLink>
                </>
              ) : (
                <NavLink onClick={() => props.logOut()} to='/'>
                  Log Out
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}
const mapDispatchToProps = {
  logOut: userActions.logOut,
  verifyToken: userActions.verifyToken,
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
