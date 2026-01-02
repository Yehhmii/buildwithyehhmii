import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StructuredData } from "../lib/structured-data";
import Chatbot from "./components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://buildwithyehhmii.vercel.app/'),
  
  title: {
    default: 'Francisco - Full-Stack Developer & Software Engineer',
    template: '%s | Francisco',
  },
  
  description: 'Full-stack developer specializing in web applications, mobile apps, AI solutions, and automation. Expert in React, Next.js, Node.js, Python, and modern technologies. Available for freelance projects worldwide.',
  
  keywords: [
    // Core skills
    'full-stack developer',
    'software engineer',
    'web developer',
    
    // Technologies
    'React developer',
    'Next.js developer',
    'Node.js developer',
    'TypeScript developer',
    'Python developer',
    
    // Services
    'mobile app developer',
    'AI integration',
    'automation solutions',
    'API development',
    
    // Location & Availability
    'Nigeria developer',
    'freelance developer',
    'remote developer',
    
    // Specific
    'web applications',
    'mobile apps',
    'AI solutions',
    'data analysis',
  ],

  authors: [{ name: 'Francisco', url: 'https://buildwithyehhmii.vercel.app/' }],
  creator: 'Francisco',
  publisher: 'Francisco',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buildwithyehhmii.vercel.app/',
    siteName: 'Francisco Portfolio',
    title: 'Francisco - Full-Stack Developer & Software Engineer',
    description: 'Building modern web & mobile applications. Expert in React, Next.js, Node.js, AI integration. Available for freelance projects.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'YEHHMII - Full-Stack Developer',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'YEHHMII - Full-Stack Developer & Software Engineer',
    description: 'Building modern web & mobile applications. Expert in React, Next.js, AI integration.',
    creator: '@yehhmii',
    images: ['/og-image.jpeg'],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  
  manifest: '/manifest.json',
  
  alternates: {
    canonical: 'https://buildwithyehhmii.vercel.app/',
  },
  
  verification: {
    google: 'your-google-verification-code', // Add after Google Search Console
  },
  
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <StructuredData />
        <meta name="theme-color" content="#2d5016" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}