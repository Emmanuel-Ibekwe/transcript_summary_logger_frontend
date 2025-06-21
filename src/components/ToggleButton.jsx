const ToggleButton = ({ toggle, onToggle }) => {
  return (
    <div
      onClick={() => onToggle()}
      className={`flex h-5 w-8 rounded-full items-center p-0.5 ${
        !toggle ? "justify-start bg-[#DFEAF2]" : "justify-end bg-[#16DBCC]"
      }`}
    >
      <div className="w-4 h-4 rounded-full bg-white"></div>
    </div>
  );
};

export default ToggleButton;
