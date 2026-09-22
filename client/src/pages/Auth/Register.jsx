import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { register } from "../../store/features/authSlice";

const Register = () => {
  const [uname, setUname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !uname.trim() ||
      !email.trim() ||
      !password.trim() ||
      !phone.trim()
    ) {
      toast.error("Please provide all fields");
      return;
    }

    try {
      await dispatch(
        register({
          uname: uname.trim(),
          email: email.trim(),
          password,
          phone: phone.trim(),
        })
      ).unwrap();

      toast.success("Registration successful!");

      setUname("");
      setEmail("");
      setPassword("");
      setPhone("");

      navigate("/login");
    } catch (error) {
      toast.error(error || "Registration failed");
    }
  };

  return (
    <section className="min-h-screen bg-[#171717] px-4 py-10">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">

        <div className="rounded-3xl border border-[#3f3f3f] bg-[#262626] p-8 shadow-2xl md:p-12">

          <h1 className="mb-3 text-center text-3xl font-bold tracking-tight text-[#f5f5f5] md:text-4xl">
            Create an account
          </h1>

          <p className="mb-8 text-center text-[#a3a3a3]">
            Register now and be part of the experience.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium text-[#e5e5e5]">
                Full Name
              </label>

              <input
                type="text"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-[#404040] bg-[#171717] px-4 py-3 text-[#f5f5f5] outline-none transition placeholder:text-[#737373] focus:border-[#a3a3a3] focus:ring-2 focus:ring-[#737373]/30"
              />
            </div>

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

            <div>
              <label className="mb-2 block text-sm font-medium text-[#e5e5e5]">
                Phone Number
              </label>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full rounded-xl border border-[#404040] bg-[#171717] px-4 py-3 text-[#f5f5f5] outline-none transition placeholder:text-[#737373] focus:border-[#a3a3a3] focus:ring-2 focus:ring-[#737373]/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#f5f5f5] py-3 font-semibold text-[#171717] transition duration-200 hover:bg-[#d4d4d4] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-[#a3a3a3]">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer font-medium text-[#f5f5f5] transition hover:text-[#d4d4d4] hover:underline"
            >
              Login
            </span>
          </p>

        </div>

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

export default Register;