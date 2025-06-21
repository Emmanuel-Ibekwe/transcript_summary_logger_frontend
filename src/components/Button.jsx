const Button = ({ children, onClick, isSubmit = true }) => {
  return (
    <button
      onClick={onClick}
      className={`${
        isSubmit
          ? "bg-[#8b6d5c] text-white hover:bg-slate-300"
          : "border-2 border-[#8b6d5c] bg-white text-[#8b6d5c] hover:bg-[#8b6d5c] hover:text-white"
      } text-sm font-medium bg-[#8b6d5c] w-30 h-10 px-2 rounded-lg hover:cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
