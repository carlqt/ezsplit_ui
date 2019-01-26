export function openAlert(body = '', variant='success') {
  return {
    type: "OPEN_ALERT",
    body,
    variant,
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
