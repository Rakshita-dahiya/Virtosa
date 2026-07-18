"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useUser,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import AnimatedBackground from "@/components/animated-background";
export default function Home() {
  const { isSignedIn } = useUser();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
const features = [
  {
    name: "Career Snapshot",
    description: "AI-powered overview of your career readiness.",
    image: "/career-growth.png",
  },
  {
    name: "Recommended Next Step",
    description: "Receive personalized career suggestions.",
    image: "/procedure.png",
  },
  {
    name: "Resume Intelligence",
    description: "Analyze your resume with AI.",
    image: "/resume.png",
  },
  {
    name: "Skill Gap Analysis",
    description: "Find missing skills for your dream role.",
    image: "/analysis.png",
  },
];
const pricingPlans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for getting started.",
    features: [
      "5 Interview Sessions",
      "Basic AI Feedback",
      "Limited Dashboard",
    ],
    button: "Get Started",
    featured: false,
  },
  {
    name: "Premium",
    price: "₹499/mo",
    description: "Everything you need to become job-ready.",
    features: [
      "Unlimited Interviews",
      "Company-specific Interview Prep",
      "Voice Analysis",
      "Career Roadmap",
      "Job Recommendations",
      "AI Recruiter Evaluation",
    ],
    button: "Upgrade Now",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For Colleges & Universities.",
    features: [
      "Student Analytics",
      "Placement Tracking",
      "Recruiter Dashboard",
      "Hiring Readiness Monitoring",
    ],
    button: "Contact Sales",
    featured: false,
  },
];
const faqs = [
  {
    question: "Is Virtosa free?",
    answer:
      "Yes. Students can start with our free plan and upgrade whenever needed.",
  },
  {
    question: "Is it designed for freshers?",
    answer:
      "Absolutely. Virtosa is built specifically for students and recent graduates.",
  },
  {
    question: "Does it provide interview practice?",
    answer:
      "Yes. Practice HR, behavioral and technical interviews with AI-powered feedback.",
  },
];
  return (
    <>

    <main className="relative overflow-hidden text-[#1C1C1C]">
      <AnimatedBackground />
      {/* NAVBAR */}
      <nav className="relative z-10 flex justify-between items-center px-10 py-6 border-b border-[#E7DFD2]">
        <h1 className="font-semibold text-xl">Virtosa</h1>
         <div className="flex gap-6 text-sm text-[#4B4B4B] items-center">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#success">Success</a>
          <a href="#works">How It Works</a>
          <a href="#testimonials">Testimonials</a>
          {/* DASHBOARD BUTTON */}
          {isSignedIn ? (
            <Link href="/dashboard">Dashboard</Link>
          ) : (
            <SignInButton mode="modal">
              <button>Dashboard</button>
            </SignInButton>
          )}

          {/* AUTH BUTTONS */}
          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="px-4 py-2 border rounded-lg">
                  Sign In
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-4 py-2 bg-black text-white rounded-lg">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton />
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
<section className="flex flex-col md:flex-row items-center px-10 min-h-[85vh]">

  {/* LEFT */}
  <div className="w-full md:w-1/2">

    <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-[#1C1C1C]">
      Virtosa
    </h2>

    <p className="mt-3 text-xl md:text-2xl font-semibold leading-snug text-[#4A4A4A]">
      Career Readiness Intelligence Platform
    </p>

    <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#6A6A6A]">
     Unlock your full career potential with AI-powered insights. Build an ATS-friendly resume, master real interview scenarios, identify critical skill gaps, and receive a personalized roadmap designed to help you stand out, get shortlisted, and confidently land your dream job.
    </p>


    {/* Buttons */}
    <div className="flex gap-4 mt-10">
<div className="rounded-lg border border-black">
  <Link
    href="/dashboard"
    className="block rounded-lg px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
  >
    Get Started Free
  </Link>
</div>

      <div className="rounded-lg border border-black">
  <a
    href="#features"
    className="block rounded-lg px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
  >
    Try AI Mock Interview
  </a>
</div>
    </div>  

  </div>


  {/* RIGHT IMAGE */}
  <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
    <div className="w-[560px] h-[512px] relative">
      <Image
        src="/hero.png"
        alt="Virtosa AI Hero"
        fill
        sizes="(max-width: 768px) 100vw, 560px"
        className="object-contain"
        priority
      />
    </div>
  </div>

</section>
       {/* FEATURES */}
<section id="features" className="relative z-10 px-10 py-24">

  <div className="text-center mb-14">
    <h2 className="text-4xl font-bold text-[#1C1C1C]">
      Powerful AI Career Features
    </h2>

    <p className="mt-4 text-[#666]">
      Everything you need to become job-ready.
    </p>
  </div>


  <div className="grid md:grid-cols-4 gap-8">

    {features.map((feature) => (

      <div
  key={feature.name}
  className="
    rounded-2xl
    p-[2px]
    bg-gradient-to-r
    from-black
    via-gray-700
    to-black
    transition-all
    duration-300
    hover:shadow-xl
    hover:-translate-y-2
  "
>
  

        <div
          className="
            rounded-2xl
            overflow-hidden
            bg-[#F5F1E8]
            h-full
          "
        >

          {/* Image Area */}
          <div className="h-40 flex items-center justify-center bg-transparent">
            <Image
            key={feature.image}
              src={feature.image}
              alt={feature.name}
              width={90}
              height={90}
              className="object-contain"
            />
          </div>


          {/* Text Area */}
          <div className="p-6">

            <h3 className="text-xl font-bold text-[#1C1C1C]">
              {feature.name}
            </h3>

            <p className="mt-3 text-gray-600 leading-relaxed">
              {feature.description}
            </p>

          </div>

        </div>

      </div>

    ))}

  </div>

</section>

      {/* PRICING */}
       {/* PRICING */}
       <section id="pricing" className="relative z-10 px-10 py-24">
  <div className="text-center mb-14">
    <h2 className="text-4xl font-bold text-[#1C1C1C]">
      Choose Your Plan
    </h2>

    <p className="mt-4 text-[#666] max-w-2xl mx-auto">
      Start for free and upgrade whenever you're ready.
    </p>
  </div>

  <div className="grid gap-8 md:grid-cols-3">
    {pricingPlans.map((plan) => (
      <div
        key={plan.name}
        className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${
          plan.featured
            ? "bg-black text-white border-black"
            : "bg-white border-[#E7DFD2]"
        }`}
      >
        <div className="p-8">
          {plan.featured && (
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full bg-white text-black">
              MOST POPULAR
            </span>
          )}

          <h3 className="text-2xl font-bold">{plan.name}</h3>

          <p
            className={`mt-2 ${
              plan.featured ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {plan.description}
          </p>

          <p className="text-5xl font-bold mt-6">{plan.price}</p>

          <ul className="mt-8 space-y-3">
            {plan.features.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 rounded-full ${
                    plan.featured ? "bg-green-400" : "bg-black"
                  }`}
                ></div>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 p-6">
          <button
            className={`w-full py-3 rounded-lg font-medium transition ${
              plan.featured
                ? "bg-white text-black hover:bg-gray-100"
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {plan.button}
          </button>
        </div>
      </div>
    ))}
  </div>
</section>
{/* ====================== SUCCESS METRICS ====================== */}
<section id="success" className="relative z-10 px-10 py-24">
  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-14">
      <h2 className="text-4xl font-bold text-[#1C1C1C]">
        Trusted by Future Professionals
      </h2>

      <p className="mt-4 text-[#666]">
        Helping students become industry-ready with AI.
      </p>
    </div>

    <div className="grid md:grid-cols-4 gap-8">

      <div className="text-center">
        <h3 className="text-5xl font-bold">10K+</h3>
        <p className="mt-3 text-gray-600">Students</p>
      </div>

      <div className="text-center">
        <h3 className="text-5xl font-bold">25K+</h3>
        <p className="mt-3 text-gray-600">AI Interviews</p>
      </div>

      <div className="text-center">
        <h3 className="text-5xl font-bold">85%</h3>
        <p className="mt-3 text-gray-600">Resume Improvement</p>
      </div>

      <div className="text-center">
        <h3 className="text-5xl font-bold">500+</h3>
        <p className="mt-3 text-gray-600">Recruiter Partners</p>
      </div>

    </div>

  </div>
</section>

{/* ====================== HOW IT WORKS ====================== */}
<section id="success" className="relative z-10 px-10 py-24">

  <div className="text-center mb-14">
    <h2 className="text-4xl font-bold">
      How Virtosa Works
    </h2>

    <p className="mt-4 text-gray-600">
      Three simple steps to become job-ready.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="bg-white rounded-2xl p-8 border border-[#E7DFD2]">
      <div className="text-5xl font-bold text-gray-300">01</div>

      <h3 className="text-2xl font-semibold mt-6">
        Upload Resume
      </h3>

      <p className="mt-4 text-gray-600">
        Upload your resume and let AI analyze your skills,
        projects and experience.
      </p>
    </div>

    <div className="bg-white rounded-2xl p-8 border border-[#E7DFD2]">
      <div className="text-5xl font-bold text-gray-300">02</div>

      <h3 className="text-2xl font-semibold mt-6">
        Get AI Insights
      </h3>

      <p className="mt-4 text-gray-600">
        Discover missing skills, resume improvements,
        interview readiness and personalized guidance.
      </p>
    </div>

    <div className="bg-white rounded-2xl p-8 border border-[#E7DFD2]">
      <div className="text-5xl font-bold text-gray-300">03</div>

      <h3 className="text-2xl font-semibold mt-6">
        Land Your Dream Job
      </h3>

      <p className="mt-4 text-gray-600">
        Practice interviews, follow your AI roadmap
        and apply confidently.
      </p>
    </div>

  </div>

</section>

{/* ====================== TESTIMONIALS ====================== */}
<section id="success" className="relative z-10 px-10 py-24">

  <div className="text-center mb-14">
    <h2 className="text-4xl font-bold">
      Loved by Students
    </h2>

    <p className="mt-4 text-gray-600">
      Real experiences from students using Virtosa.
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-8">

    <div className="bg-[#F8F5EE] rounded-2xl p-8">
      <p className="italic text-gray-700">
        "Virtosa increased my resume score from 61% to 89%.
        I finally understood what recruiters wanted."
      </p>

      <h4 className="mt-6 font-semibold">
        Ananya Sharma
      </h4>

      <span className="text-sm text-gray-500">
        B.Tech Computer Science
      </span>
    </div>

    <div className="bg-[#F8F5EE] rounded-2xl p-8">
      <p className="italic text-gray-700">
        "The AI mock interviews felt surprisingly realistic.
        I cracked my first campus placement."
      </p>

      <h4 className="mt-6 font-semibold">
        Rahul Verma
      </h4>

      <span className="text-sm text-gray-500">
        Final Year Engineering
      </span>
    </div>

    <div className="bg-[#F8F5EE] rounded-2xl p-8">
      <p className="italic text-gray-700">
        "Skill Gap Analysis showed exactly what I was missing.
        It saved me months of confusion."
      </p>

      <h4 className="mt-6 font-semibold">
        Priya Nair
      </h4>

      <span className="text-sm text-gray-500">
        Electronics Graduate
      </span>
    </div>

  </div>

</section>

{/* ====================== FAQ ====================== */}
<section id="success" className="relative z-10 px-10 py-24">
  <div className="text-center mb-12">
    <h2 className="text-4xl font-bold text-[#1C1C1C]">
      Frequently Asked Questions
    </h2>

    <p className="mt-4 text-[#666] max-w-2xl mx-auto">
      Answers to common questions about Virtosa and how it helps students
    </p>
  </div>
  </section>
<div className="space-y-5">
  {faqs.map((faq, index) => (
    <div
      key={index}
      className="bg-white rounded-xl border border-[#E7DFD2] overflow-hidden"
    >
      <button
        onClick={() =>
          setOpenIndex(openIndex === index ? null : index)
        }
        className="w-full flex justify-between items-center p-6 text-left"
      >
        <h3 className="font-semibold text-lg">
          {faq.question}
        </h3>

        <motion.span
          animate={{ rotate: openIndex === index ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-2xl font-light"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence>
        {openIndex === index && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-gray-600">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ))}
</div>
{/* ====================== CTA ====================== */}
<section id="success" className="relative z-10 px-10 py-24">
  <div className="max-w-5xl mx-auto text-center bg-white border border-[#E7DFD2] rounded-3xl p-16 shadow-sm">

    <span className="inline-block px-4 py-2 rounded-full bg-[#F5F1E8] text-[#4B4B4B] text-sm border border-[#E7DFD2]">
      Start Your Career Journey Today
    </span>

    <h2 className="mt-6 text-5xl font-bold leading-tight text-[#1C1C1C]">
      Your Dream Job Starts
      <br />
      With Virtosa AI
    </h2>

    <p className="mt-6 text-lg text-[#666666] max-w-3xl mx-auto leading-8">
      Improve your resume, discover missing skills, practice AI-powered
      interviews, and receive a personalized roadmap to become
      industry-ready.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-5 mt-10">

      {isSignedIn ? (
        <Link
          href="/dashboard"
          className="px-8 py-4 rounded-xl bg-[#1C1C1C] text-white font-semibold hover:bg-black transition"
        >
          Go to Dashboard
        </Link>
      ) : (
        <>
          <SignUpButton mode="modal">
            <button className="px-8 py-4 rounded-xl bg-[#1C1C1C] text-white font-semibold hover:bg-black transition">
              Get Started Free
            </button>
          </SignUpButton>

          <SignInButton mode="modal">
            <button className="px-8 py-4 rounded-xl border border-[#1C1C1C] text-[#1C1C1C] hover:bg-[#1C1C1C] hover:text-white transition">
              Sign In
            </button>
          </SignInButton>
        </>
      )}

    </div>

  </div>
</section>

{/* ====================== FOOTER ====================== */}
<footer className="bg-[#111111] text-gray-400">

  <div className="max-w-7xl mx-auto px-10 py-16 grid md:grid-cols-4 gap-10">

    {/* Brand */}
    <div>
      <h3 className="text-2xl font-bold text-white">
        Virtosa
      </h3>

      <p className="mt-4 leading-7">
        AI-powered Career Readiness Platform helping students become
        interview-ready, improve resumes, and launch successful careers.
      </p>
    </div>

    {/* Product */}
    <div>
      <h4 className="text-white font-semibold mb-5">
        Product
      </h4>

      <ul className="space-y-3">
        <li>
          <a href="#features" className="hover:text-white transition">
            Features
          </a>
        </li>

        <li>
          <a href="#pricing" className="hover:text-white transition">
            Pricing
          </a>
        </li>

        <li>
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
        </li>
      </ul>
    </div>

    {/* Resources */}
    <div>
      <h4 className="text-white font-semibold mb-5">
        Resources
      </h4>

      <ul className="space-y-3">
        <li>
          <a href="#features" className="hover:text-white transition">
            AI Resume Review
          </a>
        </li>

        <li>
          <a href="#features" className="hover:text-white transition">
            Interview Practice
          </a>
        </li>

        <li>
          <a href="#pricing" className="hover:text-white transition">
            Career Roadmap
          </a>
        </li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h4 className="text-white font-semibold mb-5">
        Contact
      </h4>

      <ul className="space-y-3">
        <li>support@virtosa.ai</li>
        <li>India</li>
        <li>Available 24/7</li>
      </ul>
    </div>

  </div>

  {/* Bottom Footer */}
  <div className="border-t border-gray-800">

    <div className="max-w-7xl mx-auto px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

      <p className="text-sm">
        © 2026 Virtosa. All Rights Reserved.
      </p>

      <div className="flex gap-6 text-sm">

        <a href="#" className="hover:text-white transition">
          Privacy Policy
        </a>

        <a href="#" className="hover:text-white transition">
          Terms of Service
        </a>

        <a href="#" className="hover:text-white transition">
          Contact
        </a>

      </div>

    </div>

  </div>

</footer>
   </main>
  </>
);
}