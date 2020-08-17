const API_ENDPOINT = "https://api.thecatapi.com/v1";

const getData = async url => {
  try {
    const response = await fetch(url, {
      method: "GET"
    });

    if (!response.ok) {
      throw new ApiError();
    }
  } catch (err) {}
};

class ApiError extends Error {
  constructor(message, httpCode) {
    super(message);
    this.name = "ApiError";
    this.httpCode = httpCode;
  }
}

export default {
  fetchCats: async query => {}
};
