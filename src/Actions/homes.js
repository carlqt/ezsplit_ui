import Request from 'Lib/request';

export function getMembers(homeID) {
  const url = `http://localhost:8000/home/${homeID}/members`
  const request = new Request();

  return (dispatch) => {
    return request.xget(url)
      .then((resp) => {
        console.log(resp)
        dispatch({
          type: "GET_HOME_MEMBERS",
          data: resp.data.members,
        })
      });
  }
}
