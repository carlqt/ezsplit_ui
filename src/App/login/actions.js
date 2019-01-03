export function login(data) {
  const url = "http://localhost:8000/accounts/authenticate"
  const options = {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    method: "POST",
  };

  fetch(url, options)
    .then(response => response.json())
}
