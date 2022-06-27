import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import GithubLogo from '../components/githubIcon'
import SiteLogo from '../components/logo'
import PageHead from '../components/pageHead'

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
      <PageHead />
      <div className='mx-16 my-16'>
        <SiteLogo />
        <h1 className='font-bold text-3xl mt-8 text-primary drop-shadow-md'>
          {"What's your Last.fm UserName?"}
        </h1>
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
        <Link href='https://github.com/Kalmarv/ascent'>
          <a href='https://github.com/Kalmarv/ascent' className='flex flex-row text-primary mt-4'>
            Source
            <GithubLogo className='fill-primary ml-2' />
          </a>
        </Link>
      </div>
    </>
  )
}

export default Home
