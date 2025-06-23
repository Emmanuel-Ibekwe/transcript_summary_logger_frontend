import ReadMore from "./ReadMore";
import Button from "./Button";
import { capitalizeTitle } from "../utils/formatting";

const MIN_SUMMARY_LENGTH = 200;

const Transcript = ({
  videoId,
  title,
  url,
  transcript,
  summary,
  newsChannel,
  removeActionSection,
}) => {
  return (
    <div
      className="max-w-[80%] mx-auto px-4 pb-4 pt-1 border-b-2 border-[#E0E0E0] "
      key={videoId}
    >
      <div className="font-robotoSlab font-bold text-lg">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-slate-500"
        >
          {capitalizeTitle(title)}
        </a>
      </div>

      <div className="text-sm text-[#8b6d5c]">
        News channel:{" "}
        <span className="text-[#bca79a">{`${newsChannel}`.toUpperCase()}</span>
      </div>
      <ReadMore text={transcript} maxChars={300} />
      {!removeActionSection && (
        <div className="flex w-1/3 justify-between items-center">
          <p className="text-slate-500 font-semibold">Has Summary</p>
          <div
            className={`flex w-5 h-5 rounded-full items-center justify-center border-2 border-[#8b6d5c] ${
              summary.length >= MIN_SUMMARY_LENGTH
                ? "text-white text-xs font-semibold bg-[#8b6d5c]"
                : "text-[#8b6d5c] bg-white"
            } `}
          >
            {summary.length >= MIN_SUMMARY_LENGTH && <span>&#10003;</span>}
          </div>
        </div>
      )}
      {!removeActionSection && (
        <div className="w-full flex justify-end items-center">
          <Button onClick={() => {}}>
            {summary.length >= MIN_SUMMARY_LENGTH
              ? "View summary"
              : "Enter summary"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Transcript;
