const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") || null : null;
export function login(email, password) {
  return fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      credentials: "include",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  }).then((res) => res.json());
}

export function signup(userData) {
  return fetch(`${BASE_URL}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  }).then((res) => res.json());
}

export async function uploadprofileimage(file) {
  if (!file) {
    alert("File is not uploaded properly");
    return { error: "No file selected" };
  }

  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/api/auth/uploadprofileimage`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    return await response.json(); // returns JSON directly
  } catch (error) {
    console.error(error);
    return { error: "Upload failed" };
  }
}

export async function deleteprofileimage() {
  return fetch(`${BASE_URL}/api/auth/uploadprofileimage`, {
    method: "DELETE",
    credentials: "include",
  }).then((res) => res.json());
}
