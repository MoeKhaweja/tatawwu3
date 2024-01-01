import axios from "axios";

export default async function fetchData(
  url,
  method = "GET",
  token = null,
  data = null
) {
  try {
    const config = {
      method,
      url: `http://192.168.1.2:8000/${url}`,
      headers: { "Content-Type": "multipart/form-data" },
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
