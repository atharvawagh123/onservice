const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

const token =
  typeof window !== "undefined" ? localStorage.getItem("token") || null : null;

export function getallenquiry() {
  return fetch(`${BASE_URL}/api/enquiry/getallenquiry`).then((res) => res.json);
}

export function getenquiry() {
  return fetch(`${BASE_URL}/api/enquiry`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}

export function ariseenquiry(formdata) {
  return fetch(`${BASE_URL}/api/enquiry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formdata),
  }).then((res) => res.json());
}

export function getserviceenquiry(id) {
  return fetch(
    `${BASE_URL}/api/service/getallserviceenquiry?service_id=${id}`
  ).then((res) => res.json());
}


export function deletedEnquiry(id){
  return fetch(`${BASE_URL}/api/enquiry?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

  }).then((res) => res.json());
}