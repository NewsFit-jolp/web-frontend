import home_default from "@/assets/home_default.svg";
import home_green from "@/assets/home_green.svg";
import search_default from "@/assets/search_default.svg";
import search_green from "@/assets/search_green.svg";
import my_default from "@/assets/my_default.svg";
import my_green from "@/assets/my_green.svg";
import { Link, useLocation } from "react-router-dom";

export default function NavigationBar() {
  const { pathname } = useLocation();

  return (
    <div className="nav-bar">
      <Link to="/">
        <div className="flex flex-col justify-center items-center w-6 gap-1">
          <img
            className="w-full h-full"
            src={pathname === "/" ? home_green : home_default}
            alt="home"
          />
          <div
            className={`text-xs ${pathname === "/" || "text-txt-placeholder"}`}
          >
            홈
          </div>
        </div>
      </Link>
      <Link to="/search">
        <div className="flex flex-col justify-center items-center w-6 gap-1">
          <img
            className="w-full h-full"
            src={pathname === "/search" ? search_green : search_default}
            alt="search-icon"
          />
          <div
            className={`text-xs ${
              pathname === "/search" || "text-txt-placeholder"
            }`}
          >
            검색
          </div>
        </div>
      </Link>
      <Link to="/user">
        <div className="flex flex-col justify-center items-center w-6 gap-1">
          <img
            className="w-full h-full"
            src={pathname === "/user" ? my_green : my_default}
            alt="my-icon"
          />
          <div
            className={`text-xs ${
              pathname === "/user" || "text-txt-placeholder"
            }`}
          >
            마이
          </div>
        </div>
      </Link>
    </div>
  );
}