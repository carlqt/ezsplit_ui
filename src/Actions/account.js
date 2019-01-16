import Request from 'Lib/request';

export function getAccount() {
  const url = "http://localhost:8000/account"
  const request = new Request();

  return (dispatch) => {
    return request.xget(url)
      .then((resp) => {
        dispatch({
          type: "GET_ACCOUNT",
          data: resp.data,
        })
      });
  }
}
