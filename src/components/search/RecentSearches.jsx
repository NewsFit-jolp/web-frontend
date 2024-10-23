import deleteIcon from "@/assets/delete.svg";
import { useEffect, useState } from "react";

const STORAGE_KEY = "search-history";
const MAX_SEARCHES = 5;

export default function RecentSearches({ keyword }) {
  const [searches, setSearches] = useState(
    () => JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  );
  const buttonClass = `flex flex-shrink-0 whitespace-nowrap font-bold text-xs py-2 px-4 rounded-full border-[1px] border-border bg-white text-black`;

  const updateLocalStorage = (newSearches) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSearches));
    setSearches(newSearches);
  };

  const onClickDelete = (search) => {
    const newSearches = searches.filter((it) => it !== search);
    updateLocalStorage(newSearches);
  };

  const onClickDeleteAll = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSearches([]);
  };

  useEffect(() => {
    if (!keyword) return;

    setSearches((prev) => {
      const filteredSearches = prev.filter((search) => search !== keyword);
      const newSearches = [keyword, ...filteredSearches].slice(0, MAX_SEARCHES);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSearches));
      return newSearches;
    });
  }, [keyword]);

  return (
    <div className="ml-6 mt-8">
      <div className="flex justify-between items-center mr-8 mb-4">
        <h3 className="text-lg font-bold">최근 검색어</h3>
        <button
          className="text-xs font-bold text-txt-placeholder"
          onClick={onClickDeleteAll}
        >
          모두 지우기
        </button>
      </div>
      <div className="flex gap-2 w-full h-8 overflow-x-auto scrollbar-hide">
        {searches.length === 0 ? (
          <span className="text-sm font-bold text-black/40">
            최근 검색어가 없습니다.
          </span>
        ) : (
          searches.map((it) => (
            <div key={it} className={buttonClass}>
              {it}
              <div
                className="ml-3 w-2 hover:cursor-pointer"
                onClick={() => onClickDelete(it)}
              >
                <img className="w-full h-full" src={deleteIcon} alt="삭제" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}