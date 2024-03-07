const API_URL = import.meta.env.VITE_API_URL

export async function FileDownLoad(token, key) {
  return await fetch(`${API_URL}files/${key}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then((response) => response.blob())
    .then((blob) => {
      return URL.createObjectURL(blob)
    })
    .catch((e) => {
      return e
    })
}
