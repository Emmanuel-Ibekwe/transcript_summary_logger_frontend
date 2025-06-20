import { useState } from "react";

const ReadMore = ({ text, maxChars = 100 }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded((prev) => !prev);

  const isOverflow = text.length > maxChars;
  const displayText =
    expanded || !isOverflow ? text : text.slice(0, maxChars) + "...";

  return (
    <div>
      <p>{displayText}</p>
      {isOverflow && (
        <span onClick={toggle}>{expanded ? "Read less" : "Read more"}</span>
      )}
    </div>
  );
};

export default ReadMore;
