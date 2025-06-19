import { useState } from "react";
import MainContent from "../components/Maincontent";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isFormValid = email.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <MainContent>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg w-full bg-white p-6 rounded-md"
      >
        <div>
          <label htmlFor="email" className="text-[#797979] font-sans">
            Email
          </label>
          <div className="w-full py-1">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full h-9 border-2 border-solid border-[#F2F2F2] focus:outline-none rounded-md"
            />
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

export default ForgetPassword;
