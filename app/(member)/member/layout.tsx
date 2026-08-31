import MemberSidebar from "@/components/MemberSidebar";
import Message from "@/feature/task-message/components/Message";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="flex min-h-screen bg-gray-50">
        <MemberSidebar />
        <main className="flex-1 pl-64!">
          <div className="container mx-auto p-8!">{children}</div>
        </main>
      </div>
      <Message />
    </div>
  );
}
