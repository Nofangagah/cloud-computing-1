const refreshAccessToken = async () => {
  try {
    const res = await fetch("http://localhost:3000/getAccessToken", {
      method: "GET",
      credentials: "include", 
    });
    const data = await res.json();

    if (res.ok && data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    } else {
      throw new Error(data.message || "Failed to refresh token");
    }
  } catch (err) {
    console.error("Gagal refresh token:", err);
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; 
    return null;
  }
};

export { refreshAccessToken };