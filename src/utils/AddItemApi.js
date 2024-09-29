import { BASE_URL } from "../utils/constants";
const headers = { "Content-Type": "application/json" };

const checkResponse = (res) => {
  if (!res.ok) {
    return res.json().then((data) => {
      return Promise.reject(data.message || `Error: ${res.status}`);
    });
  }
  return res.json();
};

function getItems() {
  return fetch(`${BASE_URL}/items`, {
    headers: headers,
  })
    .then(checkResponse)
    .catch((error) => {
      console.error("Error in getItems:", error);
      throw error;
    });
}

function postItems(name, imageUrl, weather, userId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
      owner: userId,
    }),
  })
    .then(checkResponse)
    .catch((error) => {
      console.error("Error in postItems:", error);
      throw error;
    });
}

function deleteItem(item) {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/items/${item._id}`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function addCardLike(cardId, token) {
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "PUT",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function removeCardLike(cardId, token) {
  return fetch(`${BASE_URL}/items/${cardId}/likes`, {
    method: "DELETE",
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
}

function fetchUserItems(userId) {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/items?owner=${userId}`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponse)
    .catch((error) => {
      console.error("Error in fetchUserItems:", error);
      throw error;
    });
}

export {
  getItems,
  postItems,
  deleteItem,
  checkResponse,
  addCardLike,
  removeCardLike,
  fetchUserItems,
};
