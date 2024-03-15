import React from 'react'
import './Nav.css';
import Logo from '../src/assets/logo.svg'

function Nav() {
    return (
        <>
            <div className="logo"><img src={Logo} alt="logo" /></div>
            <p>What magic ingredient do you absolutely want to eat today?</p>
        </>
    )
}

export default Nav