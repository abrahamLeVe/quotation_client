import { login, postDataFromApi } from "@/lib/api";
import {
  AuthInterface,
  loginUserPromps,
  registerUserPromps,
} from "@/models/auth.model";

export async function loginUser(data: loginUserPromps) {
  const res = (await login("/api/auth/local?locale=es", data)) as AuthInterface;
  return res;
}

export async function registerUser(data: registerUserPromps) {
  const res = await postDataFromApi("/api/auth/local/register?locale=es", data);
  return res;
}

export async function registerNewsletter(data: { data: { email: string } }) {
  const res = await postDataFromApi("/api/newsletters", data);
  return res;
}
