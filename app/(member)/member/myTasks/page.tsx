import MyTaskMainPage from "@/feature/member/myTask/components/MyTaskMainPage";

type TaskHomeProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    filter?: string;
  }>;
};

const MyTaskPage = ({ searchParams }: TaskHomeProps) => {
  return <MyTaskMainPage searchParams={searchParams} />;
};

export default MyTaskPage;
