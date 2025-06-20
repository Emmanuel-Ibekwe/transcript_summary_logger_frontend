import ReadMore from "./ReadMore";

const Transcript = ({ key, title, url, transcript, summary, newsChannel }) => {
  return (
    <li
      className="max-w-[80%] mx-auto p-4 border-b-2 border-[#E0E0E0]"
      key={key}
    >
      <div className="flex justify-end w-full ">
        <div className="flex justify-center h-8 w-8 rounded-full text-[#333] text-lg items-center border border-[#8b6d5c]">
          &rarr;
        </div>
      </div>
      <div>{title}</div>
      <div className="text-sm text-blue-500">{url}</div>
      <div>{newsChannel}</div>
      <ReadMore text={transcript} maxChars={100} />
      <div className="flex w-1/3 justify-between items-center">
        <p>Has Summary</p>
        <div
          className={`flex w-8 h-8 rounded-full items-center justify-center border border-[#8b6d5c] ${
            summary.length >= 100
              ? "text-white bg-[#8b6d5c]"
              : "text-[#8b6d5c] bg-white"
          } `}
        >
          &#10003;
        </div>
      </div>
    </li>
  );
};

export default Transcript;
