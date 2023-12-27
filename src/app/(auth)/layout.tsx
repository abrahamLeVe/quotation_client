export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex flex-col max-w-screen-xl m-auto relative">
        {children}
      </main>
    </>
  );
}
