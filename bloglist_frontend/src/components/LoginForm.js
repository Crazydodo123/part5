import { useState } from 'react'

import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({
  setUser,
  notify
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch ({ response }) {
      console.log(response.data)
      setPassword('')
      notify('wrong username or password', 'error')
    }

  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor='username'>username </label>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label htmlFor='password'>password </label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type='submit' id='login-button'>login</button>
      </form>
    </div>
  )
}

export default LoginForm