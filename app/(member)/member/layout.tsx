import MemberSidebar from "@/components/MemberSidebar";
import Message from "@/feature/task-message/components/Message";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative h-screen">
      <div className="flex h-full min-h-0 bg-gray-50">
        <MemberSidebar />
        <main className="min-w-0 min-h-0 flex-1 flex flex-col pl-64!">
          <div className="container mx-auto flex-1 flex flex-col min-h-0 p-8!">
            {children}
          </div>
        </main>
      </div>
      <Message />
    </div>
  );
}
