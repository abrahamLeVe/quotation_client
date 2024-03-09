import { postDataFromApi, loginUserPost } from "@/lib/api";
import {
  AuthInterface,
  loginUserPromps,
  registerUserPromps,
} from "@/models/auth.model";

export async function loginUser(data: loginUserPromps) {
  const res = (await loginUserPost("/api/auth/local", data)) as AuthInterface;
  console.log(res);
  return res;
}

export async function registerUser(data: registerUserPromps) {
  const res = await postDataFromApi("/api/auth/local/register", data);
  return res;
}

export async function registerNewsletter(data: { data: { email: string } }) {
  const res = await postDataFromApi("/api/newsletters", data);
  return res;
}
