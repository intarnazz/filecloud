const API_URL = import.meta.env.VITE_API_URL

export async function FileChange(token, key, name) {
  return await fetch(`${API_URL}files/${key}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify({
      name: name
    })
  })
    .then((response) => response.json())
    .then((json) => {
      return json
    })
    .catch((e) => {
      return e
    })
}
