export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:pl-64">
      <div className="container-page py-10">{children}</div>
    </div>
  );
}
