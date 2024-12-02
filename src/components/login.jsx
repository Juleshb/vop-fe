import { useState, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import axiosInstance from "./utils/axios";
import login from "../assets/bg3.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [SuccessMessage, setSuccessMessage] = useState("");
  const { setAuthData } = useContext(AuthContext);
  const [showLoader, setShowLoader] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowButton(false);
    setShowLoader(true);

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axiosInstance.post(
        "/auth/login",
        loginData
      );
      const { token, user } = response.data;

      if (response.status === 200 && token) {
        setAuthData({
          token
        });

        const Token = token;
        localStorage.setItem('token', Token);

        setShowButton(true);
        setShowLoader(false);

        setShowSuccessMessage(true);
        setShowFailureMessage(false);
        setSuccessMessage("You have logged in successfully!");

       
          navigate("/admin");
        
      } else {
        console.error("Login failed:", response.statusText);
        setShowFailureMessage(true);
        setShowSuccessMessage(false);
        setErrorMessage("Failed to login: Invalid response from server.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage("User not found. Please check your email.");
        } else if (error.response.status === 400) {
          setErrorMessage("Invalid credentials. Please check your password.");
        } else {
          setErrorMessage("Failed to login. Please try again.");
        }
      } else {
        setErrorMessage("An error occurred during login. Please try again.");
      }

      console.error("Login error:", error);
      setShowFailureMessage(true);
      setShowSuccessMessage(false);
    } finally {
      setShowButton(true);
      setShowLoader(false);
    }
  };

  const closeSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const closeFailureMessage = () => {
    setShowFailureMessage(false);
  };

  return (
    <>
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
      >
        {" "}
        <div className="bg-gray-100 bg-opacity-80 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          {" "}
          <div className="md:w-1/2 px-5">
            <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you have an account, please login
            </p>

            {showSuccessMessage && (
              <div className="border-dotted px-4 py-3 border-2 border-green-500 text-sm text-green-700 bg-green-100 text-center flex justify-between mt-4">
                <p className="items-center flex">
                  <i className="mr-2">
                    <Icon icon="dashicons:saved" />
                  </i>
                  {SuccessMessage}
                </p>
                <button onClick={closeSuccessMessage}>
                  <Icon icon="bytesize:close" />
                </button>
              </div>
            )}

            {showFailureMessage && (
              <div className="border-dotted px-4 py-3 border-2 border-red-500 text-sm text-red-500 bg-red-100 text-center flex justify-between mt-4">
                <p className="items-center flex">
                  <i className="mr-2">
                    <Icon icon="bx:error-alt" />
                  </i>
                  {errorMessage}
                </p>
                <button onClick={closeFailureMessage}>
                  <Icon icon="bytesize:close" />
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6">
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>


              {/* Loader and Submit Button */}
              <div className="text-center">
                {showLoader && (
                  <div className="w-full mt-4 px-4 py-3 bg-blue-500 text-white rounded-lg flex justify-center items-center">
                    <Icon
                      icon="svg-spinners:90-ring-with-bg"
                      className="mr-2"
                    />
                    Signing in...
                  </div>
                )}

                {showButton && (
                  <button
                    type="submit"
                    className="w-full block bg-Teal hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                  >
                    Log In
                  </button>
                )}
              </div>
            </form>

          </div>
          <div className="w-1/2 md:block hidden">
            <img src={login} className="rounded-2xl" alt="page img" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
