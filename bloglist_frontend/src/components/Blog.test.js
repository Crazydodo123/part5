import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'async or await',
    author: 'Thomas Moore',
    url: 'www.blog.com/async',
    likes: 4,
    user: {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      id: '64b82c1787bb60c3f3227be3'
    }
  }

  const user = '64b82c1787bb60c3f3227be3'
  const updateBlogs = jest.fn()

  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} user={user} updateBlogs={updateBlogs} />
    ).container
  })


  test('displays only title and author by default', () => {
    screen.getByText('async or await', { exact: false })
    screen.getByText('Thomas Moore', { exact: false })

    const div = container.querySelector('.description')
    expect(div).toHaveStyle('display: none')
  })

  test('shows blog url and likes when show button is clicked', async () => {
    const user = userEvent.setup()

    const showButton = screen.getByText('view')
    await user.click(showButton)

    const div = container.querySelector('.description')
    expect(div).not.toHaveStyle('display: none')
  })

  test('like button calls the addLike function twice', async () => {
    const user = userEvent.setup()

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlogs.mock.calls).toHaveLength(2)
  })
})