const API_URL = import.meta.env.VITE_API_URL

export async function UserLogin(email, password) {
  return await fetch(`${API_URL}authorization`, {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
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
