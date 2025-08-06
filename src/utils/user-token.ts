export function getToken() {
  return localStorage.getItem("USER_TOKEN");
}

export function setToken(token: string) {
  localStorage.setItem("USER_TOKEN", token);
}

export function removeToken() {
  localStorage.removeItem("USER_TOKEN");
}
