const basePath = '/api'

export const URL = {
  home: `${basePath}/catalog`,

  books: `${basePath}/catalog/books`,
  bookinstances: `${basePath}/catalog/bookinstances`,
  authors: `${basePath}/catalog/authors`,
  genres: `${basePath}/catalog/genres`,

  //details with id which have to be appended to the url
  genre: `${basePath}/catalog/genre/`,
  book: `${basePath}/catalog/book/`,
  author: `${basePath}/catalog/author/`,
  bookinstance: `${basePath}/catalog/bookinstance/`,

  // post method urls
  genre_create: `${basePath}/catalog/genre/create`,
  author_create: `${basePath}/catalog/author/create`,
  book_create: `${basePath}/catalog/book/create`,
  bookinstance_create: `${basePath}/catalog/bookinstance/create`,

  user_signup: `${basePath}/users/register`,
}
