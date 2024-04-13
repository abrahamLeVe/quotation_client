import { changePassPost, login, postDataFromApi } from "@/lib/api";
import {
  AuthInterface,
  loginUserPromps,
  registerUserPromps,
} from "@/models/auth.model";

export async function loginUser(data: loginUserPromps) {
  const res = (await login("/api/auth/local", data)) as AuthInterface;
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

export async function changePass(data: { email: string }) {
  const res = await changePassPost("/api/auth/forgot-password", data);
  return res;
}

export async function resetPass(data: {
  code?: string;
  password: string;
  passwordConfirmation: string;
}) {
  const res = await changePassPost("/api/auth/reset-password", data);
  return res;
}
