"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { loginUser } from "../services/auth.service";

export async function LoginUser(prevState: any, formData: FormData) {
  const schema = z.object({
    identifier: z.string().min(1).email(),
    password: z.string().min(1),
  });
  try {
    const data = schema.parse({
      identifier: formData.get("identifier"),
      password: formData.get("password"),
    });
    const res = await loginUser(data);
    console.log("loginUser: ", res);
    revalidatePath("/");
  } catch (e) {
    return { message: "Email y/o contraseña incorrectos" };
  }
}
