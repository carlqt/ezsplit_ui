import Request from 'Lib/request';

export function getMembers(homeID) {
  const url = `http://localhost:8000/home/${homeID}/members`
  const request = new Request();

  return (dispatch) => {
    return request.xget(url)
      .then((resp) => {
        dispatch({
          type: "GET_HOME_MEMBERS",
          data: resp.data.members,
        })
      });
  }
}

export function getHome(homeID) {
  const url = `http://localhost:8000/home/${homeID}`
  const request = new Request();

  return (dispatch) => {
    return request.xget(url)
      .then((resp) => {
        dispatch({
          type: "GET_CURRENT_HOME",
          data: resp.data,
        })
      });
  }
}
