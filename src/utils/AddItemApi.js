const baseUrl = "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.text().then((text) => {
    console.error("Error response:", text);
    throw new Error(text);
  });
}

function getItems() {
  return fetch(`${baseUrl}/items`, {
    headers: headers,
  })
    .then(checkResponse)
    .catch((error) => {
      console.error("Error in getItems:", error);
      throw error;
    });
}

function postItems(name, imageUrl, weather) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error in postItems:", error);
      throw error;
    });
}

function deleteItem(item) {
  return fetch(`${baseUrl}/items/${item._id}`, {
    method: "DELETE",
    headers: headers,
  }).then(checkResponse);
}

export { getItems, postItems, deleteItem, checkResponse };
