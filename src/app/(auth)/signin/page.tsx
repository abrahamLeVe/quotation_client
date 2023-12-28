import SigninForm from "@/components/auth/signin/SigninForm";
import { Breadcrumbs } from "@/components/pagers/breadcrumbs";

export default async function RegisterPage() {
  // const session = await getServerSession(options);
  // console.log(session?.user);
  return (
    <>
      <Breadcrumbs
        segments={[
          {
            title: "Inicio",
            href: "/",
          },
          {
            title: "Login",
            href: "",
          },
        ]}
      />
      <SigninForm />
    </>
  );
}
