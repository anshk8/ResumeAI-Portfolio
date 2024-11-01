"use client";
import React from 'react'
import Typewriter from 'typewriter-effect'; 
import styles from '../css/MovingText.css'


const MovingText = () => {
  return (
    <div className="animateType">
      <Typewriter options={{
    strings: ['Ask About My Hobbies', 'Ask About My Projects', 'Ask About My Community Involvement', 'Ask About My Education'],
    autoStart: true,
        loop: true,
        delay: 50,
        deleteSpeed: 5
  }} />
    </div>
  );
}

export default MovingText