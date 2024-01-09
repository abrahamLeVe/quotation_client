"use server";
import { postDataFromApi } from "@/lib/api";
import {
  AuthInterface,
  loginUserPromps,
  registerUserPromps,
} from "@/models/auth.model";

export async function loginUser(data: loginUserPromps) {
  const res = (await postDataFromApi("/api/auth/local", data)) as AuthInterface;
  return res;
}

export async function registerUser(data: registerUserPromps) {
  const res = await postDataFromApi("/api/auth/local/register", data);
  return res;
}
