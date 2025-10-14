"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "../css/ChatBox.css";
import { Send } from "lucide-react";
import LoadingDots from "./LoadingDots";

const ChatBox = () => {
  //For user input, loading and displaying response
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(
    "Please Note I am AI Ansh and SOMETIMES may be inaccurate :) "
  );
  const [loading, setLoading] = useState(false);

  //Connect with server
  async function sendMessage(message) {
    //Load Screen
    setLoading(true);

    //Debug Purposes
    console.log("Sending message:", message);

    try {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log("Recieved ", data);

      setResponse(data.result || "Error: No response available.");
    } catch (error) {
      setResponse("There was an error: " + error.message);
    } finally {
      setLoading(false);
      setInput("");
    }
  }

  const handleSubmit = (e) => {
    // Prevent page refresh on form submit
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);

      // Clear input field after sending response
      setInput("");
    }
  };

  return (
    <div className="chat-interface-container">
      <div className="chatbot-header">
        <p className="sub-heading">
          Ansh&apos;s Interactive Portfolio Website. Chat with me!
        </p>
      </div>

      <div className="chat-messages-container">
        {/* Response Display and Loading screen if loading */}
        <div className="chat-message-wrapper bot">
          <div className="chat-message-bubble bot">
            {loading ? (
              <div className="typing-indicator">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
            ) : (
              <p className="chat-message-text">{response}</p>
            )}
          </div>
        </div>
      </div>

      <div className="chat-input-wrapper">
        {/* User Input Form. On submit, send input to server*/}
        <form
          id="form"
          className="chatbot-input-container"
          onSubmit={handleSubmit}
        >
          {/*User input */}
          <input
            onChange={(e) => setInput(e.target.value)}
            name="user-input"
            type="text"
            id="user-input"
            value={input}
            placeholder="Chat with Ansh!"
            required
            className="chat-input-field"
          />

          <button id="submit-btn" className="chat-input-button" type="submit">
            <Send className="chat-input-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
