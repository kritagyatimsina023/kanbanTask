import Nav from "../layout/Nav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="main-content">
        <div className="container">{children}</div>
      </main>
    </>
  );
}
