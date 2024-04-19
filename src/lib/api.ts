import { User } from "@/models/auth.model";
import { API_TOKEN, API_URL } from "../utilities/urls";
let qs = require("qs");

export async function fetchDataFromApi(endpoint: string): Promise<any> {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + API_TOKEN,
      },
      next: { revalidate: 3600 },
    };

    const res = await fetch(`${API_URL}${endpoint}`, options);

    return res.json();
  } catch (error) {
    console.log("Error of fetchDataFromApi", error);
  }
}

export async function postDataFromApi(
  endpoint: string,
  payload: any,
  token?: string
) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (token || API_TOKEN),
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

export async function login(endpoint: string, payload: any) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

export async function getUserFromApi(jwt: string): Promise<User | undefined> {
  try {
    if (jwt) {
      const options = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      };

      const res = await fetch(
        `${API_URL}/api/users/me?populate[quotations][populate][0]=pago`,
        options
      );
      const userData = await res.json();

      if (userData && userData.quotations) {
        userData.quotations = userData.quotations.filter(
          (quotation: any) => quotation.publishedAt !== null
        );
      }

      return userData;
    } else {
      return;
    }
  } catch (error) {
    console.log("Error of getUserFromApi", error);
    return undefined;
  }
}

export async function providerFetch(provider?: string, access_token?: string) {
  try {
    const options = {
      method: "GET",
    };

    const res = await fetch(
      `${API_URL}/api/auth/${provider}/callback?access_token=${access_token}`,
      options
    );

    return await res.json();
  } catch (error) {
    console.log("Error of providerAuth", error);
  }
}

export async function changePassPost(endpoint: string, payload: any) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    return error;
  }
}

export async function putDataFromApi(
  endpoint: string,
  payload: any,
  token?: string
) {
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + (token || API_TOKEN),
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  } catch (error) {
    return error;
  }
}
