import { useState, useEffect } from "react";
import { getMemberCategories } from "@/utils/api";
import logo from "@/assets/서찬혁.png";

export default function CategoryList({
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const processGetCategories = async () => {
      try {
        const { result } = await getMemberCategories();
        setCategories(result.preferredCategories);
      } catch (error) {
        console.log("Category error:", error);
      }
    };
    processGetCategories();
  }, []);

  const handleCategorySelect = (category) => {
    if (selectedCategory === category) return;
    setSelectedCategory(category);
  };

  const buttonClass = (category) => {
    return `flex-shrink-0 whitespace-nowrap font-bold text-sm py-2 px-4 rounded-full border-[1px] border-border ${
      selectedCategory === category
        ? "bg-my-purple text-white"
        : "bg-white text-black"
    }`;
  };

  return (
    <div className="flex gap-2 pl-6 w-full overflow-x-auto scrollbar-hide">
      <button
        onClick={() => handleCategorySelect("전체")}
        className={buttonClass("전체")}
      >
        전체
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategorySelect(category)}
          className={buttonClass(category)}
        >
          {category}
        </button>
      ))}
      <img src={logo} className="w-8" />
    </div>
  );
}
