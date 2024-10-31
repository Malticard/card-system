import React from 'react'
import Head from "next/head"
import favicon from "../../../public/imgs/favicon.png";

const Seo = ({ title }: { title: string }) => {
  let i = `Cards | ${title}`
  return (
    <Head>
      <title>{i}</title>
      <link rel="icon" href={favicon.src} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <meta name="description" content="Malticard - Cards &amp; An app to monitor student's drop offs and pickups" />
      <meta name="author" content="Malticard (U) Limited" />
      <meta name="keywords" content="taps"></meta>
    </Head>
  )
}

export default Seo