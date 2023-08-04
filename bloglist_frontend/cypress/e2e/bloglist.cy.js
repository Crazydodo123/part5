describe('Blog app', function ()  {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser({
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    })

    cy.createUser({
      username: 'hellas',
      name: 'Arto Hellas',
      password: 'greece'
    })

    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('The user can logout', function () {
      cy.get('#logout-button').click()

      cy.contains('log in to application')
      cy.contains('login')
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()

      cy.get('#title').type('Async or await')
      cy.get('#author').type('Thomas Moore')
      cy.get('#url').type('www.blog.com/async')
      cy.get('#create-button').click()

      cy.contains('Async or await')
    })

    describe('When several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Things I Don't Know as of 2018",
          author: 'Dan Abramov',
          url: 'https://overreacted.io/things-i-dont-know-as-of-2018'
        })

        cy.createBlog({
          title: 'Async or await',
          author: 'Thomas Moore',
          url: 'www.blog.com/async'
        })

        cy.createBlog({
          title: 'Microservices and the First Law of Distributed Objects',
          author: 'Martin Fowler',
          url: 'https://martinfowler.com/articles/distributed-objects-microservices.html'
        })
      })

      it('a blog can be liked', function () {
        cy.contains('Async or await Thomas Moore').parent().parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').contains('like').click()

        cy.get('@theBlog').contains('1')
      })

      it('a blog can be deleted by its creator', function () {
        cy.contains('Async or await Thomas Moore').parent().parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').contains('remove').click()

        cy.get('.error')
          .contains('the blog Async or await by Thomas Moore was deleted')
        cy.get('#bloglist').should('not.contain', 'Async or await')
      })

      it('a blog cannot be deleted by another user', function () {
        cy.get('#logout-button').click()

        cy.get('#username').type('hellas')
        cy.get('#password').type('greece')
        cy.get('#login-button').click()

        cy.contains('Async or await Thomas Moore').parent().parent().as('theBlog')
        cy.get('@theBlog').contains('view').click()
        cy.get('@theBlog').should('not.contain', 'remove')
      })

      it('blogs are sorted by likes', function () {
        cy.contains('Async or await').parent().parent().as('bestBlog')
        cy.contains('Microservices and the First Law of Distributed Objects').parent().parent().as('okBlog')
        cy.contains("Things I Don't Know as of 2018").parent().parent().as('badBlog')


        cy.massLike('@bestBlog', 6)
        cy.massLike('@okBlog', 3)
        cy.massLike('@badBlog', 1)


        cy.get('.blog').eq(0).should('contain', 'Async or await')
        cy.get('.blog').eq(1).should('contain', 'Microservices and the First Law of Distributed Objects')
        cy.get('.blog').eq(2).should('contain', "Things I Don't Know as of 2018")
      })
    })
  })
})