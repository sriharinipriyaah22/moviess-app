import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYpEd50jwPsJaVzq3wMoqp2qkATredLNuoNA&usqp=CAU')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <section className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full transform transition-transform duration-300 hover:scale-105" style={{ marginLeft: '2rem' }}>
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Sign In</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-transform duration-300"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-transform duration-300"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-gradient-to-r from-teal-400 to-blue-500 text-white px-4 py-3 rounded-lg shadow-md hover:from-teal-500 hover:to-blue-600 transition-transform duration-300"
          >
            {isLoading ? "Signing In ..." : "Sign In"}
          </button>
          {isLoading && <Loader />}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-700">
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-teal-600 hover:text-teal-700 hover:underline transition-colors duration-300"
            >
              Register
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
