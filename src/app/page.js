"use client";
import NavBar from './components/NavBar';
import ChatBox from './components/ChatBox'
import MovingText from './components/MovingText'
import Footer from './components/Footer'
import styles from './globals.css'

export default function Home() {
  return (
    <div className="App">
    <NavBar />

   <ChatBox />
   <Footer />
 </div>
  );
}
