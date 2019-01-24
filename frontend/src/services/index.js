import { URL } from './api-endpoints'

// fetch data for home page
export const getPageHome = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(URL.home)
      const json = await res.json()
      resolve(json)
    }
    catch {
      reject({})
    }
  })
}

// fetch data for books page
export const getPageBooks = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(URL.books)
      const json = await res.json()
      resolve(json)
    }
    catch {
      reject({})
    }
  })
}

export const getPageBookInstances = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(URL.bookinstances)
      const json = await res.json()
      resolve(json)
    }
    catch {
      reject({})
    }
  })
}

export const getPageAuthors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(URL.authors)
      const json = await res.json()
      resolve(json)
    }
    catch {
      reject({})
    }
  })
}
