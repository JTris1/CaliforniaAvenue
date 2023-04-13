import { Html, Head, Main, NextScript } from 'next/document'
import Header from '~/components/Header'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional" />
        <link rel='icon' type='image/png' sizes='32x32' href="/favicon-32x32.png" />
        <link rel='icon' type='image/png' sizes='16x16' href="/favicon-16x16.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
