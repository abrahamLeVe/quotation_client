import { postDataFromApi } from "@/lib/api";

export interface loginUserPromps {
  identifier: string | undefined;
  password: string | undefined;
}
export async function loginUser(data: loginUserPromps) {
  const res = postDataFromApi("/api/auth/local", data);
  return res;
}
