export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="main-content">
      <div className="container">{children}</div>
    </main>
  );
}
