import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/AuthStore";
import { Button } from "@/components/ui/button";

const HomeHero = () => {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <main className="pt-24 pb-6 px-4 md:px-6 lg:px-8 bg-white min-h-screen">

      <div className="max-w-[1440px] mx-auto">
        {/* The Inner Card Container */}
        <div className="relative bg-[#f8f9fa] bg-dotted-grid rounded-[2rem] md:rounded-[2.5rem] hero-card-shadow border border-slate-100 min-h-[85vh] flex flex-col items-center justify-center overflow-hidden px-6 py-12">

          {/* Hero Text Content */}
          <div className="relative z-10 text-center max-w-4xl mx-auto mb-8 animate-in fade-in zoom-in duration-700">
            {/* App Icon Visual */}
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-white rounded-2xl soft-shadow flex items-center justify-center border border-slate-50">
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#38BDF8]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#1E293B]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#1E293B]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#1E293B]"></div>
                </div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Your Personal <span className="text-blue-600">Knowledge</span>
              <br />
              <span className="text-[#94A3B8]">Vaultified</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Save notes, ideas, and documents in organized folders. Search, edit,
              and access your knowledge anytime, from anywhere with MemoStack.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => (user ? navigate("/dashboard") : navigate("/login"))}
                className="bg-[#3B82F6] text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100/50 text-lg"
              >
                Start Saving Knowledge
              </button>
              <button className="bg-white border border-slate-200 px-10 py-5 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-colors soft-shadow text-lg">
                View Demo
              </button>
            </div>
          </div>

          {/* Floating Widgets */}

          {/* Top Left: Sticky Note */}
          <div className="absolute top-12 left-[5%] hidden xl:block animate-in slide-in-from-left duration-1000">
            <div className="relative">
              <div className="w-48 h-48 bg-[#FFF9B1] p-6 soft-shadow sticky-note-rotation flex flex-col justify-center border border-yellow-200/50">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full mx-auto mb-4"></div>
                <p className="text-sm font-medium text-slate-700 leading-relaxed text-center">
                  Never lose a brilliant idea again. Jot it down and vault it instantly.
                </p>
              </div>
            </div>
          </div>

          {/* Top Right: Recent Notes */}
          <div className="absolute top-12 right-[5%] hidden lg:block animate-in slide-in-from-right duration-1000">
            <div className="w-64 bg-white rounded-3xl p-5 soft-shadow border border-slate-50">
              <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest tracking-widest">Recent Notes</span>
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 text-blue-500">📄</div>
                </div>
              </div>
              <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl shadow-sm hover:bg-white transition-colors cursor-pointer group">
                <p className="text-sm font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">Project Brainstorming</p>
                <p className="text-xs text-slate-400 mb-4">Last edited 2h ago</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#3B82F6] bg-white w-fit px-3 py-1.5 rounded-full shadow-sm">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>Ideas
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Left: Folder Progress */}
          <div className="absolute bottom-12 left-[5%] hidden lg:block animate-in slide-in-from-bottom duration-1000">
            <div className="w-72 bg-white rounded-3xl p-6 soft-shadow border border-slate-50">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-5">Vault Organization</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center text-xs text-blue-600 font-bold">📁</span>
                      <span className="text-sm font-bold text-slate-800">Research Papers</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">12 items</span>
                  </div>
                  <div className="grow bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#3B82F6] h-full w-[85%] transition-all duration-1000"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-xs text-orange-600 font-bold">📝</span>
                      <span className="text-sm font-bold text-slate-800">Meeting Notes</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">45 items</span>
                  </div>
                  <div className="grow bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-400 h-full w-[60%] transition-all duration-1000"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Right: Integrations */}
          <div className="absolute bottom-12 right-[5%] hidden xl:block animate-in slide-in-from-bottom duration-1000">
            <div className="w-64 bg-white rounded-3xl p-6 soft-shadow border border-slate-50">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-5 text-center">Seamlessly Integrated</h3>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 hover:scale-110 transition-transform cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center">
                      <div className={`w-4 h-4 rounded-sm ${i === 1 ? 'bg-blue-400' : i === 2 ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default HomeHero;