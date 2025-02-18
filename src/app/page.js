"use client";
import NavBar from './components/NavBar';
import ChatBox from './components/ChatBox'
import MovingText from './components/MovingText'
import Footer from './components/Footer'
import styles from './globals.css'

import Head from 'next/head'; // Import Head from next/head

export default function Home() {
  return (
    <div className="App">
         <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        

      </Head>
    <NavBar />

   <ChatBox />
   <Footer />
 </div>
  );
}
