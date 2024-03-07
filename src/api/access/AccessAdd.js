const API_URL = import.meta.env.VITE_API_URL

export async function AccessAdd(token, key, email) {
  return await fetch(`${API_URL}files/${key}/accesses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify({
      email: email
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
