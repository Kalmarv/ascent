import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
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
      <form onSubmit={(event) => handleSubmit(event)}>
        <input type="text" name="userName"></input>
      </form>
    </>
  )
}

export default Home
