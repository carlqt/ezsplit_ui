export function openAlert(body = '') {
  return {
    type: "OPEN_ALERT",
    body,
  }
}

export function closeAlert() {
  return {
    type: "CLOSE_ALERT",
  }
}

export function logout() {
  localStorage.clear();

  return {
    type: "LOGOUT",
  }
}
