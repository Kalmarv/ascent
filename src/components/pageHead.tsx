import Head from 'next/head'

const PageHead: React.FC<{ title?: string }> = ({ title }): JSX.Element => {
  return (
    <Head>
      <title>{title ?? 'Ascent'}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
      {/* eslint@next/next/no-page-custom-font - I'm only using it on this page so... */}
      {/* eslint-disable-next-line */}
      <link href='https://fonts.googleapis.com/css2?family=Manrope&display=swap' rel='stylesheet' />
      <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#1f2232' />
      <meta name='msapplication-TileColor' content='#1f2232' />
      <meta name='theme-color' content='#1f2232' />

      <meta name='author' content='Kalmarv' />
      <meta name='description' content='Song display for Last.fm' />
      <link rel='canonical' href='https://ascent.kalmarv.xyz/' />
      <meta name='twitter:card' content='https://ascent.kalmarv.xyz/ascent-social.png' />
      <meta name='twitter:title' content='Ascent' />
      <meta name='twitter:description' content='Song display for Last.fm' />
      <meta name='twitter:image:src' content='https://ascent.kalmarv.xyz/ascent-social.png' />
      <meta property='og:url' content='https://ascent.kalmarv.xyz/' />
      <meta property='og:title' content='Ascent' />
      <meta property='og:image' content='https://ascent.kalmarv.xyz/ascent-social.png' />
      <meta property='og:description' content='Song display for Last.fm' />
      <meta property='og:site_name' content='Ascent' />
      <meta itemProp='name' content='Ascent' />
      <meta itemProp='description' content='Song display for Last.fm.' />
      <meta itemProp='image' content='https://ascent.kalmarv.xyz/ascent-social.png' />
      <script
        async
        defer
        data-website-id='e1e098b3-ec57-474b-8721-84e66d37e650'
        src='https://umami-production-84c6.up.railway.app/umami.js'></script>
    </Head>
  )
}
export default PageHead
