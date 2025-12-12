const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") || null : null;

export function getuser() {
  return fetch(`${BASE_URL}/api/userapi/getuser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function fetchusers(page = 1, limit = 1) {
  return fetch(`${BASE_URL}/api/userapi/getuser?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

export function getUserProfile() {
  return fetch(`${BASE_URL}/api/auth/userprofile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export function getservicecurrentuser() {
  return fetch(`${BASE_URL}/api/service/current`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export async function deleteservice(id) {
  const res = await fetch(`${BASE_URL}/api/service/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to delete service");
  }

  return res.json();
}

export async function updateactivity(id) {
  return fetch(`${BASE_URL}/api/auth/activity/${id}`, {
    method: "PATCH",
  }).then((res) => res.json());
}
