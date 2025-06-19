import { useState } from "react";
import MainContent from "../components/Maincontent";

const ValidateResetCode = () => {
  const [resetCode, setResetCode] = useState("");

  const handleChange = (e) => {
    const input = e.target.value;

    // Allow only digits and limit to 6 characters
    if (/^\d{0,6}$/.test(input)) {
      setResetCode(input);
    }
  };

  const isFormValid = resetCode.trim() !== "" && resetCode.length == 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset code: ", resetCode);
  };

  const handleKeyDown = (e) => {
    // Prevent input if already 6 digits and user tries to type more
    if (resetCode.length >= 6 && /^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const displayDigits = Array(6)
    .fill("•")
    .map((dot, i) => resetCode[i] || dot);

  return (
    <MainContent>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg w-full bg-white p-6 rounded-ml"
      >
        <div>
          <label htmlFor="code" className="text-[#797979] font-sans">
            Enter 6 digit code sent to your email.
          </label>
          <div className="w-full py-1 flex justify-start items-center space-x-3">
            <input
              type="text"
              id="code"
              value={resetCode}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              inputMode="numeric"
              maxLength={6}
              autoFocus
              className="sr-only"
            />

            {displayDigits.map((char, index) => (
              <div className="w-14 h-16 border-2 border-gray-500 text-3xl flex justify-center items-center font-mono rounded-md">
                {char}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end w-full pt-2">
          <div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`${
                isFormValid
                  ? "bg-blue-400 hover:cursor-pointer active:bg-[#C3C3C3]"
                  : "bg-[#C3C3C3] hover:cursor-not-allowed"
              } h-8 w-20 rounded-md   text-white`}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </MainContent>
  );
};

export default ValidateResetCode;
