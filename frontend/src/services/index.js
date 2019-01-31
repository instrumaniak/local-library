
// generic function to get JSON data from a url endpoint
// export const getData = url => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = await fetch(url)
//       const json = await res.json()
//       resolve(json)
//     }
//     catch {
//       reject({})
//     }
//   })
// }

export const getData = url => {
  return fetch(url)
    .then(response => response.json())
}

// generic function to post JSON data to an url endpoint
export const postData = (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
}
