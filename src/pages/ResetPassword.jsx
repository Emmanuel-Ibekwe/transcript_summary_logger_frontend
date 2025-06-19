import { useState } from "react";
import MainContent from "../components/Maincontent";
import { isPasswordInvalid } from "../utils/validation";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  //   const clearMessages = () => {
  //     setTimeout(() => {
  //       setError("");
  //     }, 3000);
  //   };

  const isFormValid = password.trim() !== "" && confirmPassword.trim() !== "";

  const handlePasswordChange = (event) => {
    console.log("password: ", password);
    setError("");
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    console.log("confirm password: ", confirmPassword);
    setConfirmPassword(event.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordInvalid(password)) {
      setError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      //   clearMessages();
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and confirm password must match.");
      //   clearMessages();
      return;
    }
  };

  return (
    <MainContent>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-lg w-full bg-white p-6 rounded-md"
      >
        <div>
          <p className="text-[#797979] font-sans">Email</p>
          <div className="w-full py-1">
            <div className="w-full flex pl-2 items-center h-9 border-2 border-solid border-[#F2F2F2] rounded-md">
              {"emmanuelibekwe7@gmail.com"}
            </div>
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
              required
              className="w-full h-9 border-2 border-solid border-[#F2F2F2] focus:outline-none rounded-md"
            />
          </div>
        </div>
        {/* {----Confirm Password----} */}
        <div>
          <label
            htmlFor="confirm-password"
            className="text-[#797979] font-sans"
          >
            Password
          </label>
          <div className="w-full py-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={handleConfirmPasswordChange}
              value={confirmPassword}
              required
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

            <div className="text-xs text-[#797979]">Show Password</div>
          </label>
        </div>
        {error && <div className="text-sm text-red-500">{error}</div>}
        {/* {----Actions----} */}
        <div className="flex justify-end w-full pt-1.5">
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

export default ResetPassword;
