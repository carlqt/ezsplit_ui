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

    console.log(options);
    return fetch(url, options)
      .then(response => response.json())
  }

  xget(url, params = {}) {
    if (!isEmpty(params)) {
      url = `${url}?${this.encodedParams(params)}`
    }

    return fetch(url)
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
