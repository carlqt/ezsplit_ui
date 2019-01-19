// Works for arrays and plain objects
export function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function isAuthenticated() {
  if (localStorage.getItem('jwt')) {
    return true;
  };

  return false;
}

export function userInfo() {
  const token = localStorage.getItem('jwt');
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  return JSON.parse(window.atob(base64));
}

export function currentHouse() {
  const house = localStorage.getItem('house');

  if (house) {
    const { id, name } = JSON.parse(house);

    return {
      id,
      name,
    }
  };

  return {};
}
