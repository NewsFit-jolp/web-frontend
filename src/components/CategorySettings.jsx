import React, { useState } from "react";

/**
 * 사용자의 관심 카테고리를 선택받는 컴포넌트
 * @param {Object} props
 * @param {Function} props.onNext - 다음 단계로 넘어가는 함수
 * @returns {JSX.Element}
 */
const CategorySettings = ({ onNext }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const topics = [
    { id: 1, name: "IT", emoji: "💻" },
    { id: 2, name: "스포츠", emoji: "⚽" },
    { id: 3, name: "과학", emoji: "🔬" },
    { id: 4, name: "금융", emoji: "💰" },
    { id: 5, name: "IT", emoji: "💻" },
    { id: 6, name: "IT", emoji: "💻" },
    { id: 7, name: "IT", emoji: "💻" },
    { id: 8, name: "IT", emoji: "💻" },
  ];

  /**
   * 토픽 선택을 토글하는 함수
   * @param {number} topicId - 토글할 토픽의 ID
   */
  const toggleTopic = (topicId) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  /**
   * 토픽이 선택되었는지 확인하는 함수
   * @param {number} topicId - 확인할 토픽의 ID
   * @returns {boolean}
   */
  const isSelected = (topicId) => selectedTopics.includes(topicId);

  /**
   * 선택한 토픽의 개수를 확인하는 함수
   * @param {number} minCount - 최소 개수
   * @returns {boolean}
   */
  const hasMinimumTopics = (minCount = 3) => {
    return selectedTopics.length >= minCount;
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = () => {
    if (hasMinimumTopics()) {
      onNext(selectedTopics);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-10/12 max-w-2xl">
      <h2 className="text-3xl font-extrabold mb-3">
        관심있는 뉴스 주제를 선택해주세요.
      </h2>
      {hasMinimumTopics() ? (
        <></>
      ) : (
        <h3 className="mb-2 text-xl font-bold underline underline-offset-8 decoration-1">
          최소 3개 주제를 선택하세요.
        </h3>
      )}
      <div className="bg-white rounded-lg w-full text-center">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`cursor-pointer rounded-lg p-4 border-2 ${
                isSelected(topic.id)
                  ? "bg-background border-my-purple"
                  : "bg-none border-border"
              }`}
              onClick={() => toggleTopic(topic.id)}
            >
              <span className="text-4xl">{topic.emoji}</span>
              <span className="block mt-2 text-sm font-bold ">
                {topic.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`button fixed bottom-16 ${
          hasMinimumTopics() ? "bg-bt-default" : "bg-bt-disabled"
        }`}
        onClick={handleSubmit}
        disabled={!hasMinimumTopics()}
      >
        계속하기
      </button>
    </div>
  );
};

export default CategorySettings;
