import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { toast } from "sonner";
import axiosInstance from "../utils/apiClient";
import { LOGIN_ROUTES, SIGNUP_ROUTES } from "../constant/constant";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateSignUp = () => {
    if (!email.length) {
      toast.error("Email is Required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is Required");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password must be same");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!email.length) {
      toast.error("Email is Required");
      return false;
    }
    if (!password.length) {
      toast.error("Password is Required");
      return false;
    }
    return true;
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (validateSignUp()) {
      const res = await axiosInstance.post(SIGNUP_ROUTES, { email, password });
      console.log(res);
      if (res.status == 201) {
        navigate("/profile");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (validateLogin()) {
        const res = await axiosInstance.post(
          LOGIN_ROUTES,
          { email, password },
          { withCredentials: true }
        );
        console.log({ res });
        if (res.status === 200) navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 shadow-2xl w-[80vw] md:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        {/* Left Section */}
        <div className="flex items-center justify-center flex-col p-8">
          <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
          <p className="mt-4 text-center text-gray-600">
            Fill in the details to get started with the best chat app!
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center w-full">
          <Tabs className="w-3/4" defaultValue="login">
            {/* Tabs List */}
            <TabsList className="flex w-full">
              <TabsTrigger
                value="login"
                className="w-full text-black text-opacity-90 border-b-2 border-transparent p-3 transition-all duration-300 data-[state=active]:font-semibold data-[state=active]:text-purple-500 data-[state=active]:border-b-purple-500"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="w-full text-black text-opacity-90 border-b-2 border-transparent p-3 transition-all duration-300 data-[state=active]:font-semibold data-[state=active]:text-purple-500 data-[state=active]:border-b-purple-500"
              >
                Signup
              </TabsTrigger>
            </TabsList>

            {/* Tabs Content */}
            <TabsContent value="login" className="pt-8">
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="p-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition-all"
                >
                  Login
                </button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="pt-8">
              <form className="flex flex-col gap-4" onSubmit={handleSignUp}>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="p-3 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-600 transition-all"
                >
                  Signup
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
