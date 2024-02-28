const API_URL = import.meta.env.VITE_API_URL

export async function UserLogout(token) {
  return await fetch(`${API_URL}logout`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
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
