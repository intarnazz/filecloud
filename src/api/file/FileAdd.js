const API_URL = import.meta.env.VITE_API_URL

export async function FileAdd(token, files) {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('files[]', files[i])
  }

  return await fetch(`${API_URL}files`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  })
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((e) => {
      return e
    })
}
