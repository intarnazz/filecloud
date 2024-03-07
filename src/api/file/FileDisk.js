const API_URL = import.meta.env.VITE_API_URL

export async function FileDisk(token) {
  return await fetch(`${API_URL}files/disk`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((e) => {
      return e
    })
}
