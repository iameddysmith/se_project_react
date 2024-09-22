const BASE_URL = "http://localhost:3001";

// Register
export const register = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
};

// Login
export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((data) => {
        return Promise.reject(data.message || "Login failed");
      });
    }
    return res.json();
  });
};

// Check Token
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    }
    return res.json();
  });
};
