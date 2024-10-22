import publisherImg from "@/assets/apple_logo_black.png";

export default function NewsItem({ news }) {
  return (
    <div className="flex min-h-32 gap-6 px-4 py-4 border-b border-border hover:cursor-pointer sm:min-h-36">
      {news.image && (
        <div className="w-1/4 h-28 min-w-28 ">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={news.image}
            alt={news.title}
          />
        </div>
      )}
      <div className="flex flex-col justify-between py-2 w-3/4">
        <h2 className="font-bold line-clamp-2 text-[15px] sm:text-lg">
          {news.title}
        </h2>
        <div className="flex items-center text-xs sm:text-sm ">
          <div className="w-5 h-5 mr-2">
            <img
              className="w-full h-full rounded-full"
              src={publisherImg}
              alt="Publisher"
            />
          </div>
          <span className="font-bold text-gray-600">{news.publisher}</span>
          <span className="mx-2">·</span>
          <span className="text-gray-400">{news.time}</span>
        </div>
      </div>
    </div>
  );
}
