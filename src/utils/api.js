const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      const errorData = res.json();
      throw errorData;
    }
  } catch (e) {
    throw {
      status: e.status,
      message: e.message,
    };
  }
};

export const api = {
  fetchCats: async (keyword) => {
    try {
      const result = await request(
        `${API_ENDPOINT}/api/cats/search?q=${keyword}`
      );
      return result;
    } catch (e) {
      return e;
    }
  },
  fetchCatInfo: async (id) => {
    try {
      const result = await request(`${API_ENDPOINT}/api//cats/${id}`);
      return result;
    } catch (e) {
      return e;
    }
  },
};
