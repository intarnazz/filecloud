const API_URL = import.meta.env.VITE_API_URL

export async function FileAdd(token, files) {
  const formData = new FormData()
  files.forEach((file, key) => {
    formData.append(`file${key}`, file)
  })

  return await fetch(`${API_URL}api/files`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      return json
    })
    .catch((e) => {
      console.log(e)
      return e
    })
}
