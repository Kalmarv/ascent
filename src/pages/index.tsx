import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Home: NextPage = (): JSX.Element => {
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const inputName = formData.get('userName') as string
    if (inputName) {
      return router.push(`/user/${inputName}`)
    }
  }

  return (
    <>
      <Head>
        <title>Ascent</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <h1 className='font-bold text-5xl text-center mt-20'>{"What's your Last.fm UserName?"}</h1>
      <div className='grid place-items-center'>
        <div className='form-control'>
          <div className='input-group'>
            <form className='' onSubmit={(event) => handleSubmit(event)}>
              <input
                type='text'
                placeholder='Name…'
                name='userName'
                className='mt-8 input input-bordered'
              />
              <button className='btn btn-square' type='submit'>
                Go
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
