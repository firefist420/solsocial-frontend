import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://js.hcaptcha.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'" />
        <script 
          src="https://js.hcaptcha.com/1/api.js" 
          async defer
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}