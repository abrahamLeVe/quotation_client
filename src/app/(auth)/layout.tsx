export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const imageLoader = () => {
    const imageUrl = `./auth.webp`;
    return imageUrl as string;
  };
  console.log(imageLoader());
  return (
    <>
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full w-full bg-muted lg:flex dark:border-r">
          <img
            src={imageLoader()}
            alt="auth"
            loading="eager"
            className="aspect-auto w-full object-cover"
          />
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}
