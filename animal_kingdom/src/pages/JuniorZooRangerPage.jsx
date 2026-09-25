Import React, { useState } from "react";

Export default function JuniorZooRangerPage({ onBack }) {
  Const [formData, setFormData] = useState({ studentName: "", schoolName: "", email: "" });
  Const [loading, setLoading] = useState(false);
  Const [certificate, setCertificate] = useState(null);

  Const handleSubmit = async (e) => {
    E.preventDefault();
    SetLoading(true);

    Try {
      // FIXED: http:// -> https://
      Const response = await fetch("https://zoo-qnls.onrender.com/api/ranger/enroll", {
        Method: "POST",
        Headers: { "Content-Type": "application/json" },
        Body: JSON.stringify(formData),
      });

      Const result = await response.json();
      
      If (response.ok && result.success) {
        // ✅ DB me save hone par hi certificate set hoga
        SetCertificate(result.data);
      } else {
        // ❌ Agar backend error de
        Alert("❌ Error: " + (result.message || result.error || "Failed to generate pass"));
      }
    } catch (error) {
      Console.error("Backend Error:", error);
      // Cleaned up generic message
      Alert("❌ Server is waking up or unreachable. Please wait 30 seconds and try again!");
    } finally {
      SetLoading(false);
    }
  };

  Return (
    <div className="min-h-screen bg-emerald-950 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <button
          OnClick={onBack}
          ClassName="inline-flex items-center gap-2 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold text-sm px-5 py-2.5 rounded-xl border border-emerald-700 transition cursor-pointer shadow-lg"
        >
          ← Back to Main Website
        </button>

        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-block bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full border border-amber-500/30">
            🎓 Official Wildlife Student Program
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Junior Zoo Ranger Certification 🎒
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            Fill in your details below to register and get your personalized digital Zoo Ranger Pass!
          </p>
        </div>

        {!certificate ? (
          /* Enrollment Form */
          <form
            OnSubmit={handleSubmit}
            ClassName="bg-emerald-900/40 border border-emerald-500/20 p-6 sm:p-10 rounded-3xl space-y-5 max-w-lg mx-auto shadow-2xl backdrop-blur-md"
          >
            <div>
              <label className="block text-xs font-bold uppercase mb-1.5 text-emerald-200">
                Student Full Name
              </label>
              <input
                Type="text"
                Required
                Placeholder="e.g. Ananya Sharma"
                Value={formData.studentName}
                OnChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                ClassName="w-full bg-emerald-950 border border-emerald-700 rounded-xl p-3.5 text-white focus:outline-none focus:border-amber-400 text-sm transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1.5 text-emerald-200">
                School / College Name
              </label>
              <input
                Type="text"
                Required
                Placeholder="e.g. Delhi Public School"
                Value={formData.schoolName}
                OnChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                ClassName="w-full bg-emerald-950 border border-emerald-700 rounded-xl p-3.5 text-white focus:outline-none focus:border-amber-400 text-sm transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1.5 text-emerald-200">
                Email Address
              </label>
              <input
                Type="email"
                Required
                Placeholder="student@example.com"
                Value={formData.email}
                OnChange={(e) => setFormData({ ...formData, email: e.target.value })}
                ClassName="w-full bg-emerald-950 border border-emerald-700 rounded-xl p-3.5 text-white focus:outline-none focus:border-amber-400 text-sm transition"
              />
            </div>

            <button
              Type="submit"
              Disabled={loading}
              ClassName="w-full bg-amber-500 hover:bg-amber-400 text-black font-extrabold py-4 rounded-xl transition cursor-pointer flex items-center justify-center gap-2 text-base shadow-lg mt-2"
            >
              {loading ? "Generating..." : "Generate Digital Ranger Pass 📜"}
            </button>
          </form>
        ) : (
          /* NAYA PRO RANGER PASS DESIGN */
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-100 via-emerald-50 to-amber-200 text-emerald-950 border-4 border-amber-500 p-6 sm:p-8 rounded-3xl max-w-xl mx-auto shadow-2xl space-y-6 text-center relative overflow-hidden">
              
              {/* Pass Top Banner */}
              <div className="flex justify-between items-center border-b-2 border-emerald-900/20 pb-4">
                <div className="font-black text-left">
                  <div className="text-xs text-amber-700 uppercase tracking-widest font-bold">Official Wildlife Pass</div>
                  <div className="text-base sm:text-lg text-emerald-950 tracking-wider">🦁 ANIMAL KINGDOM ZOO</div>
                </div>
                <span className="text-xs font-mono font-bold bg-emerald-900 text-amber-300 px-3 py-1.5 rounded-xl shadow-md">
                  ID: {certificate.certificateId}
                </span>
              </div>

              {/* Ranger Details Card */}
              <div className="bg-white/70 backdrop-blur-sm border border-amber-400/50 p-4 rounded-2xl shadow-inner space-y-2">
                <div className="text-4xl">🎖️</div>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-emerald-950">
                  {certificate.studentName}
                </h3>
                <p className="text-xs font-bold text-emerald-800 bg-amber-200/60 inline-block px-3 py-1 rounded-full border border-amber-300">
                  🏫 {certificate.schoolName}
                </p>
                <div className="text-xs font-extrabold text-amber-800 uppercase tracking-widest pt-1">
                  Verified Junior Wildlife Ranger
                </div>
              </div>

              {/* Ranger Pledge & Privileges */}
              <div className="text-left bg-emerald-900/10 p-4 rounded-2xl border border-emerald-900/10 space-y-2">
                <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  🌟 Ranger Privileges & Pledge:
                </p>
                <ul className="text-xs font-semibold text-emerald-900/90 space-y-1">
                  <li>✔ VIP Access to Wildlife Workshops & Live Feeding Shows</li>
                  <li>✔ Priority Entry at Zoo Knowledge & Quiz Counters</li>
                  <li>✔ Promised to Protect Animals & Keep Nature Clean</li>
                </ul>
              </div>

              {/* Pass Footer */}
              <div className="flex justify-between items-center text-xs font-bold pt-2 border-t-2 border-emerald-900/20 text-emerald-800">
                <span>Issued On: {certificate.issuedAt}</span>
                <span className="text-emerald-700 font-extrabold bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-300">
                  ✅ Gate Verified Pass
                </span>
              </div>
            </div>

            <div className="text-center">
              <button
                OnClick={() => setCertificate(null)}
                ClassName="text-xs text-amber-400 hover:underline font-bold cursor-pointer"
              >
                ← Issue Another Ranger Pass
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}