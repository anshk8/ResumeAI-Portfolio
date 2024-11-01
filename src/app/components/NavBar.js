"use client";
import React from 'react'
import styles from '../css/navBar.css'
import MovingText from './MovingText';

const NavBar = () => {
    return (
        <div className='nav-container'>
            <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap" rel="stylesheet"></link>

            <h1>AnshGPT</h1>
            <MovingText />

        </div>
    )
}

export default NavBar