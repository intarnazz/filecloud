const API_URL = import.meta.env.VITE_API_URL

export async function FileDelete(token, key) {
  return await fetch(`${API_URL}files/${key}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((e) => {
      return e
    })
}
