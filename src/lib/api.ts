"use server";
import { API_URL, API_TOKEN} from "../utilities/urls";

export async function fetchDataFromApi(endpoint: string): Promise<any> {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + API_TOKEN,
      },
      // next: { revalidate: 5 },
    };

    const res = await fetch(`${API_URL}${endpoint}`, options);

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Error of fetchDataFromApi", error);
  }
}

export async function postDataFromApi(endpoint: string, payload: any) {
  console.log(payload);
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export async function getUserFromApi(jwt: string): Promise<any> {
  try {
    if (jwt) {
      const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };

      const res = await fetch(`${API_URL}/api/users/me`, options);

      const data = await res.json();

      return data;
    } else {
      return;
    }
  } catch (error) {
    console.log("Error of getUserFromApi", error);
  }
}
