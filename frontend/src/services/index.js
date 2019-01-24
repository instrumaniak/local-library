
// generic function to get data from a url endpoint
export const getData = url => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url)
      const json = await res.json()
      resolve(json)
    }
    catch {
      reject({})
    }
  })
}
