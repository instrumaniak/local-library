const basePath = 'http://localhost:5000'

export const URL = {
  home: `${basePath}/catalog`,

  books: `${basePath}/catalog/books`,
  bookinstances: `${basePath}/catalog/bookinstances`,
  authors: `${basePath}/catalog/authors`,
  genres: `${basePath}/catalog/genres`,

  //details with id which have to be appended to the url
  genre: `${basePath}/catalog/genre/`,
  book: `${basePath}/catalog/book/`,
  author: `${basePath}/catalog/author/`
}
