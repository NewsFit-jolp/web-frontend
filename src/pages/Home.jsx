import IsLoginContext from "@/contexts/IsLoginContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Header from "@/components/main/Header";
import CategoryList from "@/components/main/CategoryList";
import NewsCarousel from "@/components/main/NewsCarousel";
import NewsList from "@/components/main/NewsList";
import NavigationBar from "@/components/common/NavigationBar";

const Home = () => {
  // const { islogin } = useContext(IsLoginContext);
  // if (!islogin) return <Navigate to="/login" />;
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-2xl mb-32 relative">
        <Header />
        <div className="sticky top-0 bg-gradient-to-b from-white to-white/90 z-50 py-6">
          <CategoryList />
        </div>
        <h2 className="text-xl font-extrabold m-6 mt-0">헤드라인 뉴스</h2>
        <NewsCarousel className="z-0" />
        <h2 className="text-xl font-extrabold m-6 ">
          구독한 언론사의 최신 뉴스
        </h2>
        <NewsList />
        <NavigationBar />
      </div>
    </div>
  );
};

export default Home;
