
export const fetchDataFromApi = async (endpoint: string): Promise<any> => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + process.env.NEXT_STRAPI_API_TOKEN,
      },
    };

    const res = await fetch(
      `${process.env.NEXT_STRAPI_API_URL}${endpoint}`,
      options
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Error of fetchDataFromApi", error);
  }
};
