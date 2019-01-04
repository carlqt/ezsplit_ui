import Request from 'Lib/request';

export function login(data) {
  const url = "http://localhost:8000/accounts/authenticate"
  const request = new Request();

  // fetch(url, options)
  //   .then(response => response.json())

  return request.post(url, data)
    .then((resp) => {
      localStorage.setItem('jwt', resp.data.token)
      return resp;
    });
}
