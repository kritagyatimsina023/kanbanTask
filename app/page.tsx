import { getSession } from "@/lib/auth";
import { Role } from "@/generated/prisma/enums";
import Hero from "@/feature/HomePage/components/Hero";
import OverView from "@/feature/HomePage/components/OverView";
import RoleBased from "@/feature/HomePage/components/RoleBased";
import TaskManagement from "@/feature/HomePage/components/TaskManagement";
import Analytics from "@/feature/HomePage/components/Analytics";
import Notification from "@/feature/HomePage/components/Notification";
import Rewards from "@/feature/HomePage/components/Rewards";
import CTA from "@/feature/HomePage/components/CTA";
import Footer from "@/feature/HomePage/components/Footer";

const HomePage = async () => {
  const session = await getSession();
  // const getStartedHref = "/login";
  const getStartedHref = !session
    ? "/login"
    : session.role === Role.ADMIN
      ? "/admin"
      : "/member";

  console.log(getStartedHref);
  return (
    <main className="overflow-hidden bg-white text-gray-900">
      <Hero getStartedHref={getStartedHref} />
      <OverView />
      <RoleBased />
      <TaskManagement />
      <Analytics />
      <Notification />
      <Rewards />
      <CTA getStartdHref={getStartedHref} />
      <Footer />
    </main>
  );
};

export default HomePage;
