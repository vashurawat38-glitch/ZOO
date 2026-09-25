import React from "react";

export default function JuniorRangerBanner({ onExplore }) {
  return (
    <section className="max-w-6xl mx-auto my-12 px-4">
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-3xl border border-emerald-500/30 p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Content */}
        <div className="space-y-4 text-left max-w-xl z-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-amber-500/30">
            ✨ Free Student Wildlife Program
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            Become an Official <span className="text-amber-400">Junior Zoo Ranger! 🎒</span>
          </h2>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Get your free digital pass and present it at the zoo counter to participate in exclusive **wildlife workshops, interactive quizzes, and special student events**. Boost your knowledge and learn animal conservation firsthand!
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-emerald-300 pt-1">
            <span className="flex items-center gap-1">
              🎟️ Free Event Entry
            </span>
            <span className="flex items-center gap-1">
              🧠 Wildlife Knowledge & Quizzes
            </span>
            <span className="flex items-center gap-1">
              📜 Verified Ranger Pass
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="z-10 w-full md:w-auto flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onExplore}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-black font-extrabold px-8 py-4 rounded-2xl shadow-xl transition transform active:scale-95 flex items-center justify-center gap-3 text-base cursor-pointer tracking-wide"
          >
            Get Free Pass & Enroll ➔
          </button>
          <span className="text-xs text-emerald-400/80 font-medium">Takes less than 2 minutes</span>
        </div>

      </div>
    </section>
  );
}