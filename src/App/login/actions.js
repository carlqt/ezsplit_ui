import Request from 'Lib/request';

export function login(data) {
  const url = "http://localhost:8000/accounts/authenticate"
  const request = new Request();
  const { email, password } = data;

  return request.post(url, { email, password })
    .then((resp) => {
      if (resp.ok) {
        localStorage.setItem('jwt', resp.data.token)
      }

      return resp;
    });
}
