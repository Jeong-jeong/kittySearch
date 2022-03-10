const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const api = {
  fetchCats: async (keyword) => {
    try {
      const result = await fetch(
        `${API_ENDPOINT}/api/cats/search?q=${keyword}`
      );
      if (result.ok) {
        return result.json();
      } else {
        const errorData = await result.json();
        throw errorData;
      }
    } catch (e) {
      throw {
        status: e.status,
        message: e.message,
      };
    }
  },
};
