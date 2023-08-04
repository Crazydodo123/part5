import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Status from './components/Status'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser')

    if (loggedUser !== 'null' && loggedUser !== null) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const notify = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 4000)
  }

  const addBlog = async (blogToAdd) => {
    try {
      const receivedBlog = await blogService.create(blogToAdd)
      const newBlog = { ...receivedBlog, user }

      setBlogs(blogs.concat(newBlog))
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)

    } catch({ response }) {
      console.log(response.data)
      notify(response.data.error, 'error')
    }
  }

  return (
    <div>
      <Notification notification={notification} />

      {!user &&
        <LoginForm
          setUser={setUser}
          notify={notify}
        />
      }

      {user &&
        <div>
          <Status
            user={user}
            setUser={setUser}
          />

          <Togglable buttonLabel='create new blog'>
            <BlogForm
              addBlog={addBlog}
            />
          </Togglable>
        </div>
      }


      <BlogList
        blogs={blogs}
        setBlogs={setBlogs}
        user={user}
        setUser={setUser}
        notify={notify}
      />

    </div>
  )
}

export default App