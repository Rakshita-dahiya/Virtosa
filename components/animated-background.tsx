"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#F5F1E8]">
      
      <div className="absolute top-[-200px] left-[-150px] h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-3xl animate-pulse" />

      
      <div
        className="absolute right-[-180px] top-[100px] h-[450px] w-[450px] rounded-full bg-purple-500/20 blur-3xl animate-pulse"
        style={{ animationDelay: "1.5s" }}
      />

      
      <div
        className="absolute bottom-[-200px] left-1/3 h-[500px] w-[500px] rounded-full bg-pink-400/20 blur-3xl animate-pulse"
        style={{ animationDelay: "3s" }}
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  );
}