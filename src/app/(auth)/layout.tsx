import BackGround from "@/components/auth/BackGround";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(BackGround());
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full w-full bg-muted lg:flex dark:border-r">
          <BackGround />
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}
