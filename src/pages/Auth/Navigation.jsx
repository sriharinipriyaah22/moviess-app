import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-[#0f0f0f] border w-48 px-4 py-2 rounded-lg shadow-lg">
      <section className="flex items-center space-x-4">
        {/* Icons for all users */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:scale-105 hover:text-white"
          >
            <AiOutlineHome size={24} />
          </Link>

          <Link
            to="/movies"
            className="flex items-center transition-transform transform hover:scale-105 hover:text-white"
          >
            <MdOutlineLocalMovies size={24} />
          </Link>

          {!userInfo ? (
            <>
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:scale-105 hover:text-white"
              >
                <AiOutlineLogin size={24} />
              </Link>

              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:scale-105 hover:text-white"
              >
                <AiOutlineUserAdd size={24} />
              </Link>
            </>
          ) : (
            <div className="relative flex items-center">
              <button
                onClick={toggleDropdown}
                className="text-gray-300 focus:outline-none transition-transform transform hover:scale-105"
              >
                <span className="text-white">{userInfo.username}</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ml-1 transition-transform transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <ul
                  className={`absolute right-0 mt-2 w-40 space-y-1 bg-white text-gray-600 rounded-lg shadow-lg transition-all duration-300 ${
                    !userInfo.isAdmin ? "-top-20" : "-top-24"
                  }`}
                >
                  {userInfo.isAdmin && (
                    <li>
                      <Link
                        to="/admin/movies/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}

                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={logoutHandler}
                      className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Navigation;
