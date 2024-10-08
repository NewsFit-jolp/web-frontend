import React, { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

/**
 * 사용자의 관심 언론사를 선택받는 컴포넌트
 * @param {Object} props
 * @param {Function} props.onNext - 다음 단계로 넘어가는 함수
 * @returns {JSX.Element}
 */
const PublisherSelect = ({ onNext, initialData, buttonText }) => {
  const [subscribedPublisher, setSubscribedPublisher] = useState(initialData);

  const publishers = [
    { id: 1, name: "SBS 연예뉴스", img: "💻" },
    { id: 2, name: "한국경제", img: "⚽" },
    { id: 3, name: "한국경제", img: "🔬" },
    { id: 4, name: "한국경제", img: "💰" },
    { id: 5, name: "SBS 연예뉴스", img: "💻" },
    { id: 6, name: "SBS 연예뉴스", img: "💻" },
    { id: 7, name: "SBS 연예뉴스", img: "💻" },
    { id: 9, name: "SBS 연예뉴스", img: "💻" },
    { id: 10, name: "SBS 연예뉴스", img: "💻" },
    { id: 11, name: "SBS 연예뉴스", img: "💻" },
    { id: 12, name: "SBS 연예뉴스", img: "💻" },
    { id: 13, name: "SBS 연예뉴스", img: "💻" },
  ];

  const toggleSubscribe = (publisherId) => {
    setSubscribedPublisher((prev) =>
      prev.includes(publisherId)
        ? prev.filter((id) => id !== publisherId)
        : [...prev, publisherId]
    );
  };

  /**
   * 구독 버튼이 선택되었는지 확인하는 함수
   * @param {number} publisherId - 확인할 언론사의 ID
   * @returns {boolean}
   */
  const isSelected = (publisherId) => subscribedPublisher.includes(publisherId);

  /**
   * 구독한 언론사의 개수를 확인하는 함수
   * @param {number} minCount - 최소 개수
   * @returns {boolean}
   */
  const hasMinimumSubscribe = (minCount = 3) => {
    return subscribedPublisher.length >= minCount;
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = () => {
    if (hasMinimumSubscribe()) {
      onNext(subscribedPublisher);
    }
  };

  return (
    <>
      {hasMinimumSubscribe() ? (
        <></>
      ) : (
        <h3 className="mb-2 text-xl font-bold underline underline-offset-8 decoration-1">
          최소 3개 언론사를 구독하세요.
        </h3>
      )}
      <ScrollArea className="min-h-[350px] mb-20">
        {publishers.map((publisher) => (
          <div key={publisher.id} className="flex justify-between w-full mb-4">
            <div className="flex">
              <span className="text-4xl mr-8">{publisher.img}</span>
              <span className="block mt-2 font-bold">{publisher.name}</span>
            </div>
            <button
              className={`subs_button ${
                isSelected(publisher.id) ? "bg-my-purple text-white" : ""
              }`}
              onClick={() => toggleSubscribe(publisher.id)}
            >
              {isSelected(publisher.id) ? "구독중" : "+ 구독"}
            </button>
          </div>
        ))}
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      {hasMinimumSubscribe() ? (
        <Button className="absolute bottom-0" onClick={handleSubmit}>
          {buttonText}
        </Button>
      ) : (
        <Button className="absolute bottom-0" disabled>
          {buttonText}
        </Button>
      )}
    </>
  );
};

export default PublisherSelect;
