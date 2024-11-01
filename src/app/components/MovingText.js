"use client";
import React from 'react'
import { ReactTyped } from 'react-typed';
import styles from '../css/MovingText.css'


const MovingText = () => {
  return (
    <div className = "animateType">

      <ReactTyped strings={[
          "Ask about my education",
            "Ask about my hobbies",
            "Ask about my projects",
        "Ask about my community involvement",
        "Ask when I am available"
            
        ]} typeSpeed={50} backspeed={50} loop/>


    </div>
  )
}

export default MovingText