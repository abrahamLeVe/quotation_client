"use server";
import { postDataFromApi } from "@/lib/api";
import { loginUserPromps, registerUserPromps } from "@/models/auth.model";

export async function loginUser(data: loginUserPromps) {
  const res = postDataFromApi("/api/auth/local", data);
  return res;
}

export async function registerUser(data: registerUserPromps) {
  const res = await postDataFromApi("/api/auth/local/register", {...data,});
  console.log("llego al service ", res);
  return res;
}
