const API_URL = import.meta.env.VITE_API_URL

export async function UserReg(first_name, last_name, email, password) {
  console.log(API_URL);
  return await fetch(`${API_URL}api/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/json'
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
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
