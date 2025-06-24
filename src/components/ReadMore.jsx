import { useState } from "react";

const ReadMore = ({ text, maxChars = 200, isCopyRemoved = false }) => {
  const [expanded, setExpanded] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [copyError, setCopyError] = useState("");

  const toggle = () => setExpanded((prev) => !prev);

  const isOverflow = text.length > maxChars;
  const displayText =
    expanded || !isOverflow ? text : text.slice(0, maxChars) + "...";

  const handleCopy = async () => {
    try {
      setCopyError("");
      await navigator.clipboard.writeText(text);
      setIsClicked(true);
      setTimeout(() => {
        setIsClicked(false);
      }, 300);
    } catch (error) {
      console.log(error);
      setCopyError("Copying failed");
      setTimeout(() => {
        setIsClicked(false);
        setCopyError("");
      }, 300);
    }
  };

  return (
    <div className="font-worksans font-normal">
      <p>{displayText}</p>
      <div
        className={`flex w-full items-center ${
          isOverflow ? "justify-between" : "justify-end"
        }`}
      >
        {isOverflow && (
          <span
            className="text-sm text-blue-400 hover:text-blue-600 hover:cursor-pointer"
            onClick={toggle}
          >
            {expanded ? "Read less" : "Read more"}
          </span>
        )}
        {!isCopyRemoved && (
          <p
            onClick={handleCopy}
            className="w-24 h-6 flex justify-center items-center hover:cursor-pointer px-2 rounded-md border-2 border-slate-300 text-xs text-slate-300 active:text-grey-300 active:border-slate-300"
          >
            {isClicked ? "Copied!" : copyError ? copyError : "Copy text"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReadMore;
