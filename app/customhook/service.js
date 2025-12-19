const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') || null : null;

export async function getallservice(page = 1, limit = 1) {
  return await fetch(
    `${BASE_URL}/api/service?page=${page}&limit=${limit}`
  ).then(res => res.json());
}

export async function fecthservice(id) {
  return await fetch(`${BASE_URL}/api/service/${id}`).then(res => res.json());
}

export async function updateservice(id, formdata) {
  return fetch(`${BASE_URL}/api/service/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(formdata),
  }).then(res => res.json());
}

export async function createservice(data, file) {
  try {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);

    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(`${BASE_URL}/api/service`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // **do NOT set Content-Type**, browser sets it automatically
      },
      body: formData,
    });

    return await response.json();
  } catch (e) {
    console.log(e);
  }
}

export async function findusersearchservice(serach, page, limit = 10) {
  return fetch(
    `${BASE_URL}//api/service/searchservice?search=${serach}&page=${page}&limit=${limit}`
  ).then(res => res.json());
}

export async function changeserviceactivestate(id) {
  return fetch(`${BASE_URL}/api/service/changeactivestate/${id}`, {
    method: 'PUT',
  }).then(res => res.json());
}
