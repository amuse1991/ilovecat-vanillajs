const API_ENDPOINT = "https://api.thecatapi.com/v1";
const DEFAULT_LIMIT = 20;

const request = async (url, method = "GET", params = {}, body = {}) => {
  if (params.constructor !== Object) {
    throw new Error("type error");
  }
  const queryStr = Object.entries(params).reduce((qStr, entry) => {
    const [key, val] = entry;
    return qStr === "" ? `?${key}=${val}` : `${qStr}&&${key}=${val}`;
  }, "");
  // FIXME: reducer 안에서 발생하는 에러 캐치가 안됨
  const response = await fetch(url + queryStr, {
    method
  });
  // fetch는 404 떠도 에러로 처리 안하기 때문에 ok flag 확인 해줘야 함
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

const breeds = {
  getList: async (params = {}) => {
    try {
      const response = await request(`${API_ENDPOINT}/breeds`, "GET", {
        ...params,
        limit: params.limit || DEFAULT_LIMIT
      });
      return response;
    } catch (err) {
      throw err;
    }
  },
  findByName: async (params = {}) => {
    const { name } = params;
    if (!name) throw new Error("name 필수");

    try {
      const response = await request(`${API_ENDPOINT}/breeds/search`, "GET", {
        ...params
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
};

const images = {
  findByBreedID: async (params = {}) => {
    const { breed_id } = params;
    if (!breed_id) throw new Error("breed_id 필수");

    try {
      const response = await request(`${API_ENDPOINT}/images/search`, "GET", {
        ...params
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
};

export default {
  breeds,
  images
};
