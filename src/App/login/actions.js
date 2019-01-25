import Request from 'Lib/request';

export function login(data) {
  const url = "http://localhost:8000/accounts/authenticate"
  const request = new Request();
  const { email, password } = data;

  return dispatch => {
    return request.post(url, { email, password })
      .then((resp) => {
        if (resp.ok) {
          localStorage.setItem('jwt', resp.data.token)

          dispatch({
            type: "GET_ACCOUNT",
            data: resp.data,
          })
        }

        return resp;
      });
  }
}
