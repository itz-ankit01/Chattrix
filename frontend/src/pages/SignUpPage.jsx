import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useSignup from "../hooks/useSignup.jsx";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });



  const { error, isPending, signupMutation } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900/50 relative overflow-hidden"
      data-theme="forest"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-bounce delay-500"></div>
      </div>

      <div className="border border-emerald-500/20 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl flex flex-col lg:flex-row w-full max-w-5xl mx-auto rounded-xl shadow-2xl shadow-emerald-500/10 overflow-hidden hover:shadow-emerald-500/20 hover:border-emerald-500/30 transition-all duration-500 transform hover:-translate-y-1 relative z-10">
        {/* SIGNUP FROM LEFT SIDE */}

        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col relative">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-r from-emerald-600/5 to-teal-600/5 rounded-t-2xl"></div>

          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2 relative z-10">
            <div className="p-2 rounded-xl transition-transform hover:rotate-12 hover:scale-110 duration-300">
              <ShipWheelIcon className="w-9 h-9 text-emerald-300 drop-shadow-xl animate-pulse" />
            </div>
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-teal-300 to-green-400 tracking-wider hover:from-emerald-200 hover:to-green-300 transition-all duration-500 drop-shadow-lg">
              Chattrix
            </span>
          </div>

          {/* ERROR MESSAGE IF ANY */}
          {error && (
            <div
              className="alert alert-error mb-4 bg-red-900/80 border border-red-500/50 text-red-100 backdrop-blur-sm rounded-xl shadow-lg"
              style={{
                animation: "slideDown 0.3s ease-out",
              }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{error.response.data.message}</span>
              </div>
            </div>
          )}

          <div className="w-full relative z-10 mt-4">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-emerald-400 hover:text-emerald-200 transition-colors duration-300 mb-2">
                    Create Account
                  </h2>
                  <p className="text-sm text-slate-300 hover:text-slate-200 transition-colors duration-300">
                    Join Chattrix and start your language learning adventure! ✨
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="form-control w-full group">
                    <label htmlFor="" className="label">
                      <span className="label-text text-emerald-200 font-medium">
                        Full Name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="input w-full bg-slate-700/60 border-2 border-slate-600/70 text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:bg-slate-700/80 hover:border-emerald-600/70 hover:bg-slate-700/70 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 backdrop-blur-sm rounded-lg"
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="form-control w-full group">
                    <label htmlFor="" className="label">
                      <span className="label-text text-emerald-200 font-medium">
                        Email
                      </span>
                    </label>
                    <input
                      type="email"
                      placeholder="John@gmail.com"
                      className="input w-full bg-slate-700/60 border-2 border-slate-600/70 text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:bg-slate-700/80 hover:border-emerald-600/70 hover:bg-slate-700/70 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 backdrop-blur-sm rounded-lg"
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="form-control w-full group">
                    <label htmlFor="" className="label">
                      <span className="label-text text-emerald-200 font-medium">
                        Password
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="********"
                      className="input w-full bg-slate-700/60 border-2 border-slate-600/70 text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:bg-slate-700/80 hover:border-emerald-600/70 hover:bg-slate-700/70 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 backdrop-blur-sm rounded-lg"
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 hover:text-slate-300 transition-colors duration-300">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Password must be at least of 6 characters long
                    </p>
                  </div>

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2 p-3 rounded-lg hover:bg-slate-700/30 transition-all duration-300 group">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm border-slate-500 hover:border-emerald-500 [--chkbg:theme(colors.emerald.600)] [--chkfg:white] transition-all duration-300 shadow-sm"
                        required
                      />
                      <span className="text-xs leading-tight text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                        I agree to the{" "}
                        <span className="text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer font-medium transition-all duration-200">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-emerald-400 hover:text-emerald-300 hover:underline cursor-pointer font-medium transition-all duration-200">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  className="btn btn-primary w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 border-0 text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-emerald-500/40 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                  type="submit"
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm text-slate-300">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-emerald-400 hover:text-emerald-300 hover:underline font-medium transition-all duration-200 relative group"
                    >
                      Sign in
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM RIGHT SIDE */}

        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-emerald-900/10 via-slate-800/20 to-slate-700/30 items-center justify-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-24 h-24 bg-teal-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-500/10 rounded-full blur-lg animate-bounce delay-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/5 to-transparent animate-pulse"></div>
          </div>

          <div className="max-w-md p-8 relative z-10">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-2xl group-hover:blur-xl group-hover:from-emerald-400/30 group-hover:to-teal-400/30 transition-all duration-700"></div>
              <img
                src="/i.png"
                alt="Language connection illustration"
                className="w-full h-full relative z-10 drop-shadow-2xl group-hover:scale-105 group-hover:drop-shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-700"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold text-emerald-100 hover:text-emerald-50 transition-colors duration-300">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70 text-slate-300 hover:text-slate-200 transition-colors duration-300">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
