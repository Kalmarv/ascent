import { Html, Head, Main, NextScript } from 'next/document'
import PageHead from '../components/pageHead'

export default function Document() {
  return (
    <Html>
      <Head>
        <PageHead />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
