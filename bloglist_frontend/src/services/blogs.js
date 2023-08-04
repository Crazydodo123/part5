import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blogUpdate) => {
  const blogUrl = `${baseUrl}/${blogUpdate.id}`
  const blogToSend = { ...blogUpdate,
    user: blogUpdate.user.id,
  }
  delete blogToSend.id

  const response = await axios.put(blogUrl, blogToSend)
  return response.data
}

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token }
  }
  const blogUrl = `${baseUrl}/${blogId}`

  const response = await axios.delete(blogUrl, config)
  return response
}

export default { getAll, create, setToken, update, remove }