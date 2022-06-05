import type { NextPage } from 'next'
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
      <h1 className="font-bold text-5xl text-center mt-20">{"What's your Last.fm UserName?"}</h1>
      <div className="grid place-items-center">
        <form className="" onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            name="userName"
            className="mt-8 input input-bordered rounded-full input-accent w-full"
          ></input>
        </form>
      </div>
    </>
  )
}

export default Home
