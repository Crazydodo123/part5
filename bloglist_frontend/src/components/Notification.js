const Notification = ({
  notification
}) => {
  const defaultStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const setStyle = (style) => {
    if (style === 'error') {
      return errorStyle
    } else {
      return defaultStyle
    }
  }

  if (!notification) return null
  return (
    <div style={setStyle(notification.type)} className={notification.type}>
      {notification.message}
    </div>
  )
}

export default Notification