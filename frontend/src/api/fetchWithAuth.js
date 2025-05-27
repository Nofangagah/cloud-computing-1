import { refreshAccessToken } from "./authService.js";

const fetchWithAuth = async (url, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");

  let response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  // Jika token kadaluarsa, coba refresh
  if (response.status === 401) {
    const newAccessToken = await refreshAccessToken();
    if (!newAccessToken) return response; // gagal refresh

    // Ulangi request dengan token baru
    response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${newAccessToken}`,
      },
    });
  }

  return response;
};

export { fetchWithAuth };