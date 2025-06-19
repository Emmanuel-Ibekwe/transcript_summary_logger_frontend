import { useState } from "react";
import MainContent from "../components/Maincontent";
import { isPasswordInvalid, isValidEmail } from "../utils/validation";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleEmailChange = (event) => {
    console.log("email: ", email);
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    console.log("password: ", password);
    setPassword(event.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isPasswordInvalid(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    if (!isValidEmail(email)) {
      setError("Email is invalid.");
    }
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
              onChange={handleEmailChange}
              value={email}
              className="w-full h-9 border-2 border-solid border-[#F2F2F2] focus:outline-none rounded-md"
            />
          </div>
        </div>
        {/* {----Password----} */}
        <div>
          <label htmlFor="password" className="text-[#797979] font-sans">
            Password
          </label>
          <div className="w-full py-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={handlePasswordChange}
              value={password}
              className="w-full h-9 border-2 border-solid border-[#F2F2F2] focus:outline-none rounded-md"
            />
          </div>
        </div>
        {/* {----Show Password----} */}
        <div className="w-full flex justify-start space-x-2">
          <label
            htmlFor="show-password"
            className="w-full flex justify-start space-x-1"
          >
            <input
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev) => !prev)}
            />
            <span className="text-xs text-[#797979]">Show Password</span>
          </label>
        </div>
        <div className="text-sm text-red-500">{error}</div>
        {/* {----Actions----} */}
        <div className="flex justify-between w-full pt-1.5">
          <div className="flex space-x-2">
            <div className="text-sm text-blue-400 hover:cursor-pointer hover:text-[#C3C3C3]">
              Login
            </div>
          </div>
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
              Sign up
            </button>
          </div>
        </div>
      </form>
    </MainContent>
  );
};

export default Signup;
