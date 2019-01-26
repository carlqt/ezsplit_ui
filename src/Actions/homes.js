import Request from 'Lib/request';
import { decamelize } from '@ridi/object-case-converter';
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

export function invite(token) {
  const url = `http://localhost:8000/invite/${token}`
  const request = new Request();

  return request.xget(url);
}

export function joinHome(token, data) {
  const url = `http://localhost:8000/invite/`
  const request = new Request();
  const params = {
    account: decamelize(data),
    invite_token: token,
  }

  return (dispatch) => (
    request.post(url, params)
      .then((resp) => {
        if (resp.ok) {
          localStorage.setItem('jwt', resp.data.token)
          dispatch({
            type: "GET_ACCOUNT",
            data: resp.data,
          })
        }

        return resp;
      })
  )
}
