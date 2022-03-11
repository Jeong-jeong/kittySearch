const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const { data } = await res.json();
      return { status: res.status, data };
    } else {
      throw res;
    }
  } catch (e) {
    throw {
      status: e.status,
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
      const result = await request(`${API_ENDPOINT}/api/cats/${id}`);
      return result;
    } catch (e) {
      return e;
    }
  },
};
