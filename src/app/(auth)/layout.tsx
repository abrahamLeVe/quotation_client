export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10  lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900/5 z-40" />
          <img
            src="./auth.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}
