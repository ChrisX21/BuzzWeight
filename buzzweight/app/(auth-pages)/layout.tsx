export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-honey-glow flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
