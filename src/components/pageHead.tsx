import Head from 'next/head'

const PageHead: React.FC<{ title?: string }> = ({ title }): JSX.Element => {
  return (
    <Head>
      <title>{title ? title : 'Ascent'}</title>
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
  )
}
export default PageHead
