import NavigationBar from "@/components/common/NavigationBar";
import NewsList from "@/components/main/NewsList";
import CategoryNewsCarousel from "@/components/search/CategoryNewsCarousel";
import RecentSearches from "@/components/search/RecentSearches";
import SearchInput from "@/components/search/SearchInput";
import { useState } from "react";

const categoryList = ["IT / 과학", "경제", "생활 / 문화"];

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-2xl mb-32">
        <SearchInput search={search} setSearch={setSearch} />
        <RecentSearches />
        <div className="h-0 w-full border-[0.5px] border-border my-8"></div>
        {search === "" ? (
          categoryList.map((category) => (
            <CategoryNewsCarousel key={category} category={category} />
          ))
        ) : (
          <>
            <div className="m-6 mt-0 text-xl font-extrabold">{`"${search}"에 대한 뉴스`}</div>
            <NewsList search={search} />
          </>
        )}

        <NavigationBar />
      </div>
    </div>
  );
};

export default Search;
