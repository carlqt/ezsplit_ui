import Request from 'Lib/request';

export function createReceipt(homeID, data) {
  const url = `http://localhost:8000/home/${homeID}/receipts`
  const request = new Request();

  return (dispatch) => {
    return request.post(url, data)
      .then((resp) => {
        console.log(resp);
      });
  }
}
