import Request from 'Lib/request';
import { currentHouse } from 'Lib/helpers';

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
        });

        dispatch({
          type: 'SET_CURRENT_PROFILE',
          data: resp.data.currentProfile,
        });
      })
  }
}

export function getCurrentHouse() {
  const { id } = currentHouse();

  return getHome(id);
}

export function joinHome(token) {
  const url = `http://localhost:8000/invite/${token}`
  const request = new Request();

  return request.xget(url);
}
