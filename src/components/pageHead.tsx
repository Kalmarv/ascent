import Head from 'next/head'

const PageHead: React.FC<{ title?: string }> = ({ title }): JSX.Element => {
  return (
    <Head>
      <title>{title ?? 'Ascent'}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
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
      <meta name='twitter:card' content='/ascent-social.png' />
      <meta name='twitter:title' content='Ascent' />
      <meta name='twitter:description' content='Song display for Last.fm' />
      <meta name='twitter:image:src' content='/ascent-social.png' />
      <meta property='og:url' content='https://ascent.kalmarv.xyz/' />
      <meta property='og:title' content='Ascent' />
      <meta property='og:image' content='/ascent-social.png' />
      <meta property='og:description' content='Song display for Last.fm' />
      <meta property='og:site_name' content='8Bit Code' />
      <meta itemProp='name' content='Ascent' />
      <meta itemProp='description' content='Song display for Last.fm.' />
      <meta itemProp='image' content='/ascent-social.png' />
    </Head>
  )
}
export default PageHead
