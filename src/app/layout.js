import Head from 'next/head'
import './globals.css'
import './page.module.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'remixicon/fonts/remixicon.css'
import 'react-quill/dist/quill.snow.css';
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"></link>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body>{children}</body>
    </html>
  )
}
