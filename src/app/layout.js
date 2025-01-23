import localFont from "next/font/local";
import "./globals.css";
import Head from 'next/head'; // Import Head for meta tags

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata object for default SEO settings
export const metadata = {
  title: "AnshAI Portfolio",
  description: "Hello! My name is Ansh Kakkar and I am a second year student specializing in artificial intelligence and machine learning at Carleton University. Come learn about me by talking to my AI Version or connect with me on linkedin!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Add any additional meta tags here */}
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
