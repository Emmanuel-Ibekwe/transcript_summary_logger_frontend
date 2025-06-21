import { useState } from "react";

const ReadMore = ({ text, maxChars = 200 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((prev) => !prev);

  const isOverflow = text.length > maxChars;
  const displayText =
    expanded || !isOverflow ? text : text.slice(0, maxChars) + "...";

  return (
    <div className="font-worksans font-normal">
      <p>{displayText}</p>
      {isOverflow && (
        <span
          className="text-sm text-blue-400 hover:text-blue-600 hover:cursor-pointer"
          onClick={toggle}
        >
          {expanded ? "Read less" : "Read more"}
        </span>
      )}
    </div>
  );
};

export default ReadMore;
