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
