const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

// const token =
//   typeof window !== "undefined" ? localStorage.getItem("token") || null : null;

export async function getcategory() {
  return fetch(`${BASE_URL}/api/category`).then((res) => res.json());
}

export async function deletecategory(id) {
  return fetch(`${BASE_URL}/api/category/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export async function addcategory(name) {
  return fetch(`${BASE_URL}/api/category`, {
    method: "POST",
    body: JSON.stringify(name),
  }).then((res) => res.json());
}

export async function getcategoryaccordingtoserivce(query, limit = 50) {
  return fetch(
    `${BASE_URL}/api/category/servicecategory?search=${query}&limit=${limit}`,
  ).then((res) => res.json());
}
