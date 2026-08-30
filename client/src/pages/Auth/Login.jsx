import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!email.trim() || !password.trim()) {
        return toast.error("Please provide all fields");
      }

      console.log({
        password,
        email,
      });

      setEmail("");
      setPassword("");

      toast.success("Login successful!");
      navigate("/cars");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="min-h-screen bg-[#171717] px-4 py-10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

        {/* Login Card */}
        <div className="rounded-3xl border border-[#3f3f3f] bg-[#262626] p-8 shadow-2xl md:p-12">

          <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-[#f5f5f5] md:text-4xl">
            Login Form
          </h1>

          <p className="mb-8 text-center text-[#a3a3a3]">
            Welcome back!
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#e5e5e5]">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-[#404040] bg-[#171717] px-4 py-3 text-[#f5f5f5] outline-none transition placeholder:text-[#737373] focus:border-[#a3a3a3] focus:ring-2 focus:ring-[#737373]/30"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[#e5e5e5]">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#404040] bg-[#171717] px-4 py-3 text-[#f5f5f5] outline-none transition placeholder:text-[#737373] focus:border-[#a3a3a3] focus:ring-2 focus:ring-[#737373]/30"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#f5f5f5] py-3 font-semibold text-[#171717] transition duration-200 hover:bg-[#d4d4d4] hover:shadow-lg active:scale-[0.98]"
            >
              Login
            </button>

          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-[#a3a3a3]">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="cursor-pointer font-medium text-[#f5f5f5] transition hover:text-[#d4d4d4] hover:underline"
            >
              Register
            </span>
          </p>

        </div>

        {/* Image Section */}
        <div className="hidden justify-center md:flex">
          <img
            src="https://play-lh.googleusercontent.com/VbmpdCXIy-jLT1Rvxu3uW6pUZkhwGcesWzR9_hIrMFzIAW3rFyAES8oVY73dotu6D5Y21YU3_RF9Vxyb4n6Ab0o"
            alt="Registration"
            className="w-full max-w-md rounded-3xl border border-[#3f3f3f] object-cover shadow-2xl grayscale transition duration-500 hover:scale-[1.02] hover:grayscale-0"
          />
        </div>

      </div>
    </section>
  );
};

export default Login;
