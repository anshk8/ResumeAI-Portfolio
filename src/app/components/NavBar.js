"use client";
import React from "react";
import styles from "../css/navBar.css";
import MovingText from "./MovingText";
import { Bot } from "lucide-react";

const NavBar = () => {
  return (

      <div className="chat-header">
        <div className="chat-header-content">
          <Bot className="chat-bot-icon" />
          <h1 className="chat-title">AnshGPT</h1>
        </div>
        <MovingText />
      </div>
      

  );
};

export default NavBar;
