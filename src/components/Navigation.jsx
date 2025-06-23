import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store/userSlice";

const Navigation = () => {
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <div className="h-12 bg-[#333333] px-2 text-white text-2xl flex justify-between items-center">
        Summary Logger
        <ul className="flex items-center space-x-2 text-base">
          {!accessToken && (
            <li>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#ddd]"
                    : "text-white hover:cursor-pointer hover:text-[#ddd]"
                }
              >
                Log in
              </NavLink>
            </li>
          )}
          {!accessToken && (
            <li>
              <NavLink
                to="signup"
                className={({ isActive }) =>
                  isActive
                    ? "cursor-pointer text-[#ddd] border border-[#ddd]  rounded-md p-1.5"
                    : "cursor-pointer hover:text-[#ddd] hover:border-[#ddd] text-white border border-white rounded-md p-1.5"
                }
              >
                Sign up
              </NavLink>
            </li>
          )}
          {accessToken && (
            <li
              onClick={() => dispatch(logout())}
              className="hover:cursor-pointer hover:text-[#ddd] hover:border-[#ddd] border border-white rounded-md p-1.5"
            >
              Sign out
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navigation;
