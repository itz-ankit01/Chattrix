import React, { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  CameraIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const queryClient = useQueryClient();

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile Onboarded Successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      console.error("Onboarding Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to complete onboarding"
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Avatar Changed Successfully");
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-purple-900/30 to-pink-900/40 relative overflow-hidden"
      data-theme="forest"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-green-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-emerald-500/12 rounded-full blur-xl animate-bounce delay-500"></div>
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-pink-400/12 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 bg-teal-400/12 rounded-full blur-xl animate-bounce delay-300"></div>
      </div>

      <div className="border border-pink-500/25 bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl w-full max-w-4xl shadow-2xl shadow-pink-500/15 rounded-xl overflow-hidden hover:shadow-pink-500/25 hover:border-pink-500/35 transition-all duration-500 transform hover:-translate-y-1 relative z-10">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 relative">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-pink-600/8 to-emerald-600/6 rounded-t-xl"></div>

          <div className="mb-4 flex items-center justify-center gap-2">
              <div className="p-2 rounded-xl transition-transform hover:rotate-12 hover:scale-110 duration-300">
                <ShipWheelIcon className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 text-pink-300 drop-shadow-xl animate-pulse" />
              </div>
              <span className="text-3xl sm:text-4xl md:text-4xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-emerald-300 to-teal-400 tracking-wider hover:from-pink-200 hover:to-teal-300 transition-all duration-500 drop-shadow-lg">
                Chattrix
              </span>
          </div>

          {/* Header with logo */}
          <div className="text-center mb-8 relative z-10 pt-2">
            
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-pink-400 hover:text-pink-200 transition-colors duration-300 mb-3">
              Complete Your Profile
            </h1>
            <p className="text-sm sm:text-base text-slate-300 hover:text-slate-200 transition-colors duration-300">
              Help us personalize your language learning experience ✨
            </p>
          </div>

          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4 mb-6">
              {/* IMAGE PREVIEW */}
              <div className="relative size-24 sm:size-28 md:size-32 rounded-full overflow-hidden border-3 border-pink-500/35 group hover:border-pink-400/55 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-pink-500/25 bg-gradient-to-br from-slate-700/60 to-slate-800/60">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/15 to-emerald-500/15 rounded-full blur-sm group-hover:blur-none group-hover:from-pink-400/25 group-hover:to-emerald-400/25 transition-all duration-500"></div>
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover relative z-10 transition-transform group-hover:scale-110 duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full relative z-10">
                    <CameraIcon className="size-8 sm:size-10 md:size-12 text-slate-400 group-hover:text-pink-300 transition-colors duration-300" />
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="btn btn-sm sm:btn-md bg-gradient-to-r from-pink-600/80 to-emerald-600/80 hover:from-pink-500 hover:to-emerald-500 border-pink-500/30 text-white font-medium shadow-lg hover:shadow-xl hover:shadow-pink-500/35 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 text-xs sm:text-sm backdrop-blur-sm"
              >
                <ShuffleIcon className="size-3 sm:size-4 mr-1 sm:mr-2" />
                Generate Avatar
              </button>
            </div>

            {/* FULL NAME */}
            <div className="form-control group">
              <label className="label">
                <span className="label-text text-pink-200 font-medium">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input w-full bg-slate-700/60 border-2 border-slate-600/70 text-slate-100 placeholder-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:bg-slate-700/80 hover:border-pink-600/70 hover:bg-slate-700/70 hover:shadow-lg hover:shadow-pink-500/15 transition-all duration-300 backdrop-blur-sm rounded-lg"
                placeholder="Your full name"
                required
              />
            </div>

            {/* BIO */}
            <div className="form-control group">
              <label className="label">
                <span className="label-text text-pink-200 font-medium">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea w-full h-24 bg-slate-700/60 border-2 border-slate-600/70 text-slate-100 placeholder-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:bg-slate-700/80 hover:border-pink-600/70 hover:bg-slate-700/70 hover:shadow-lg hover:shadow-pink-500/15 transition-all duration-300 backdrop-blur-sm rounded-lg resize-none"
                placeholder="Tell others about yourself and your language learning goals"
                maxLength={200}
              />
              <span className="text-xs text-slate-400 mt-1 text-right hover:text-slate-300 transition-colors duration-300">
                {formState.bio.length}/200
              </span>
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NATIVE LANGUAGE */}
              <div className="form-control group">
                <label className="label">
                  <span className="label-text text-pink-200 font-medium">
                    Native Language
                  </span>
                </label>
                <div className="relative">
                  <select
                    name="nativeLanguage"
                    value={formState.nativeLanguage}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        nativeLanguage: e.target.value,
                      })
                    }
                    className="select w-full bg-slate-700/60 border-2 border-slate-600/70 text-slate-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:bg-slate-700/80 hover:border-pink-600/70 hover:bg-slate-700/70 hover:shadow-lg hover:shadow-pink-500/15 transition-all duration-300 backdrop-blur-sm rounded-lg appearance-none cursor-pointer"
                    required
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f472b6' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                    }}
                  >
                    <option value="" className="bg-slate-800 text-slate-400 py-2">Select your native language</option>
                    {LANGUAGES.map((lang) => (
                      <option 
                        key={`native-${lang}`} 
                        value={lang.toLowerCase()} 
                        className="bg-slate-800 hover:bg-slate-700 text-slate-100 py-2 px-4 transition-colors duration-200"
                      >
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control group">
                <label className="label">
                  <span className="label-text text-pink-200 font-medium">
                    Learning Language
                  </span>
                </label>
                <div className="relative">
                  <select
                    name="learningLanguage"
                    value={formState.learningLanguage}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        learningLanguage: e.target.value,
                      })
                    }
                    className="select w-full bg-slate-700/60 border-2 border-slate-600/70 text-slate-100 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:bg-slate-700/80 hover:border-emerald-600/70 hover:bg-slate-700/70 hover:shadow-lg hover:shadow-emerald-500/15 transition-all duration-300 backdrop-blur-sm rounded-lg appearance-none cursor-pointer"
                    required
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%2310b981' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 0.5rem center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '1.5em 1.5em',
                    }}
                  >
                    <option value="" className="bg-slate-800 text-slate-400 py-2">Select language you're learning</option>
                    {LANGUAGES.map((lang) => (
                      <option 
                        key={`learning-${lang}`} 
                        value={lang.toLowerCase()} 
                        className="bg-slate-800 hover:bg-slate-700 text-slate-100 py-2 px-4 transition-colors duration-200"
                      >
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control group">
              <label className="label">
                <span className="label-text text-pink-200 font-medium">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-slate-400 group-focus-within:text-emerald-400 group-hover:text-emerald-400 transition-colors duration-300" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input w-full pl-10 bg-slate-700/60 border-2 border-slate-600/70 text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 focus:bg-slate-700/80 hover:border-emerald-600/70 hover:bg-slate-700/70 hover:shadow-lg hover:shadow-emerald-500/15 transition-all duration-300 backdrop-blur-sm rounded-lg"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <button
              className="btn w-full mt-8 py-3 text-lg font-semibold bg-gradient-to-r from-pink-600 to-emerald-600 hover:from-pink-500 hover:to-emerald-500 border-0 text-white shadow-xl hover:shadow-2xl hover:shadow-pink-500/40 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-sm"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;