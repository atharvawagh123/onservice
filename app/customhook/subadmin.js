const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") || null : null;

export async function addsubadmin(formData) {
  return fetch(`${BASE_URL}/api/subadmin/createsubadmin`, {
    method: "POST",
    body: JSON.stringify(formData),
  }).then((res) => res.json());
}

export async function fetchsubadmin(search = "", page = 1, limit = 1) {
  return fetch(
    `${BASE_URL}/api/subadmin/createsubadmin?search=${search}&page=${page}&limit=${limit}`,
  ).then((res) => res.json());
}

export async function updatesubadminbyadmin(formData, id) {
  const res = await fetch(`${BASE_URL}/api/auth/updatesubadmin/${id}`, {
    method: "PUT",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Update failed");
  }

  return data;
}
