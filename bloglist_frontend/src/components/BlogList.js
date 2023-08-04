import Blog from './Blog'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogList = ({
  blogs,
  setBlogs,
  user,
  notify
}) => {

  const updateBlogs = async (blogUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogUpdate)

      const newBlogs = blogs.map(blog => {
        if (blog.id === updatedBlog.id) {
          const newBlog = { ...updatedBlog,
            user: blog.user
          }
          return newBlog
        } else {
          return blog
        }
      })
      setBlogs(newBlogs)
    } catch(response) {

      console.log(response.data)
      notify(response.data.error, 'error')
    }
  }

  const deleteBlog = (blogDelete) => {
    const newBlogs = blogs.filter(blog => {
      return blog.id !== blogDelete.id
    })
    setBlogs(newBlogs)
  }

  if (!user) return null

  const sortedBlogs = blogs.sort((a, b) => {
    return (b.likes - a.likes)
  })

  return (
    <div id='bloglist'>
      <br />
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          updateBlogs={updateBlogs}
          deleteBlog={deleteBlog}
          notify={notify}
        />
      )}
    </div>
  )
}


BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default BlogList