import React from 'react'
import Head from "next/head"
import favicon from "../../../public/imgs/favicon.png";

const Seo = ({ title }: { title: string }) => {
  let i = `Boda Boda Banja | ${title}`
  return (
    <Head>
      <title>{i}</title>
      <link rel="icon" href={favicon.src} />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <meta name="description" content="Malticard - Boda Boda Banja System" />
      <meta name="author" content="Malticard (U) Limited" />
      <meta name="keywords" content="taps Boda Boda Banja"></meta>
    </Head>
  )
}

export default Seo