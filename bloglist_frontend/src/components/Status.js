const Status = ({
  user,
  setUser
}) => {

  const logout = () => {
    window.localStorage.setItem(
      'loggedBloglistUser', null
    )
    setUser(null)
  }

  if (!user) return null

  return (
    <div>
      <h2>blogs</h2>
      {user.name} logged in
      <button onClick={logout} id='logout-button'>
        logout
      </button>
    </div>
  )
}

export default Status