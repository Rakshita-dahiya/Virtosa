"use client";
import AnimatedBackground from "@/components/animated-background";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CareerSnapshot from "@/components/ui/dashboard/CareerSnapshot";

import ResumeIntelligence from "@/components/ui/dashboard/ResumeIntelligence";
import SkillGapAnalysis from "@/components/ui/dashboard/SkillGapAnalysis";
import InterviewPractice from "@/components/ui/dashboard/InterviewPractice";
import CareerRoadmap from "@/components/ui/dashboard/CareerRoadmap";
import JobMatching from "@/components/ui/dashboard/JobMatching";
import ProgressTracker from "@/components/ui/dashboard/ProgressTracker";

import {
  BarChart3,
  Sparkles,
  FileText,
  Brain,
  MessageSquare,
  Route,
  Briefcase,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  const [open, setOpen] = useState(true);

  const [selected, setSelected] = useState("snapshot");

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  const menu = [
  {
    id: "snapshot",
    name: "Career Snapshot",
    icon: BarChart3,
  },

  {
    id: "resume",
    name: "Resume Intelligence",
    icon: FileText,
  },

  {
    id: "skill",
    name: "Skill Gap Analysis",
    icon: Brain,
  },

  {
    id: "roadmap",
    name: "Career Roadmap",
    icon: Route,
  },

  {
    id: "interview",
    name: "AI Mock Interview",
    icon: MessageSquare,
  },


  {
    id: "jobs",
    name: "Job Matching",
    icon: Briefcase,
  },

  {
    id: "progress",
    name: "Progress Tracker",
    icon: Activity,
  },
];

  return (
     <>
    <AnimatedBackground />
    <main className="relative z-10 flex bg-transparent text-[#1C1C1C]">
      {/* ================= SIDEBAR ================= */} 

      <aside
        className={`fixed left-0 top-0 h-screen bg-white/70 backdrop-blur-xl border-r border-white/20 transition-all duration-300 ${
          open ? "w-72" : "w-20"
        }`}
      >
        {/* Logo */}

        <div
          onClick={() => setOpen(!open)}
          className="h-16 flex items-center justify-between px-5 border-b border-[#E7DFD2] cursor-pointer"
        >
          <h1 className="font-bold text-xl">
            {open ? "Virtosa" : "V"}
          </h1>

          <span>{open ? "←" : "→"}</span>
        </div>

        {/* Menu */}

        <div className="p-3 space-y-2">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  selected === item.id
                    ? "bg-black text-white"
                    : "hover:bg-[#F5F1E8]"
                }`}
              >
                <Icon
                  size={18}
                  className={
                    selected === item.id
                      ? "text-white"
                      : "text-black"
                  }
                />

                {open && (
                  <span className="text-sm">
                    {item.name}
                  </span>
                )}
              </button>
            );
          })}

        </div>
      </aside>

      {/* ================= CONTENT ================= */}

      <div
        className={`flex-1 transition-all duration-300 ${
          open ? "ml-72" : "ml-20"
        } p-10`}
      >
        {selected === "snapshot" && <CareerSnapshot />}

      
        {selected === "resume" && <ResumeIntelligence />}

        {selected === "skill" && <SkillGapAnalysis />}
        
        {selected === "roadmap" && <CareerRoadmap />}

        {selected === "interview" && <InterviewPractice />}

        

        {selected === "jobs" && <JobMatching />}

        {selected === "progress" && <ProgressTracker />}
      </div>
    </main>
    </>
  );
 
}
    