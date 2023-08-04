import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogFrom from './BlogForm'

describe('<BlogForm />', () => {
  const addBlog = jest.fn()
  let container

  beforeEach(() => {
    container = render(<BlogFrom addBlog={addBlog} />).container
  })

  test('calls the addBlog function when given the correct inputs', async () => {
    const user = userEvent.setup()

    const titleInput = container.querySelector('#title')
    const authorInput = container.querySelector('#author')
    const urlInput = container.querySelector('#url')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'async or await')
    await user.type(authorInput, 'Thomas Moore')
    await user.type(urlInput, 'www.blog.com/async')
    await user.click(createButton)

    expect(addBlog.mock.calls).toHaveLength(1)
  })
})