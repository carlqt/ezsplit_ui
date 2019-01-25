import { isEmpty } from 'Lib/helpers';

class Request {
  constructor() {
    const jwt = localStorage.getItem('jwt');

    this.headers = {
      "Content-Type": "application/json",
    };

    if (jwt) {
      this.headers["Authorization"] = `Bearer ${jwt}`
    };
  }

  post(url = "", body = {}) {
    const method = "POST";
    const options = {
      headers: this.headers,
      body: JSON.stringify(body),
      method,
    };

    return fetch(url, options)
      .then((response) => {
        return response.json().then(json => ({
          headers: response.headers,
          status: response.status,
          ok: response.ok,
          json,
        }))
      })
  }

  xget(url, params = {}) {
    const options = {
      headers: this.headers,
    };

    if (!isEmpty(params)) {
      url = `${url}?${this.encodedParams(params)}`
    }

    return fetch(url, options)
      .then(response => response.json())
  }

  encodedParams(params) {
    const query = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');

    return query;
  }
}

export default Request;
