const API_URL = import.meta.env.VITE_API_URL

export async function FileAdd(files) {
  const formData = new FormData()
  formData.append('file', files)

  return await fetch(`${API_URL}api/files`, {
    method: 'POST',
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
