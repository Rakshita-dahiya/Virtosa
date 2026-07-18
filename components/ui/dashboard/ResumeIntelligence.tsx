"use client";

import UploadResume from "@/components/ui/uploadbutton";
import { useState } from "react";
import {
  Upload,
  FileText,
  Sparkles,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function ResumeIntelligence() {
  const [resumeUrl, setResumeUrl] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeUrl) return;

    setLoading(true);

    try {
      const response = await fetch("/api/analyze-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeUrl,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!data.success) {
        alert(data.message);
        setLoading(false);
        return;
      }

      // Remove markdown returned by Gemini
      let text = data.analysis;

      text = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(text);

      console.log(parsed);

      setAnalysis(parsed);
    } catch (err) {
      console.error(err);
      alert("Analysis failed.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-[#1C1C1C]">
          Resume Intelligence
        </h1>

        <p className="text-gray-600 mt-2">
          AI-powered resume analysis and optimization.
        </p>
      </div>

      {/* Upload Card */}

      <div className="bg-white border border-[#E7DFD2] rounded-2xl p-8">
        <div className="flex items-center gap-3">
          <FileText size={28} />

          <h2 className="text-2xl font-semibold">
            Upload Resume
          </h2>
        </div>

        <div className="mt-6 h-52 border-2 border-dashed rounded-xl flex flex-col justify-center items-center">
          <Upload size={40} className="text-gray-500" />

          <p className="mt-3 font-medium">
            Upload your resume
          </p>

          <p className="text-sm text-gray-500">
            PDF only (Maximum 8MB)
          </p>

          {resumeUrl && (
            <p className="text-green-600 mt-2">
              ✅ Resume uploaded successfully
            </p>
          )}

          <div className="mt-4">
            <UploadResume
              onUploadComplete={(url) => {
                setResumeUrl(url);
              }}
            />
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!resumeUrl || loading}
          className="mt-6 bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-40"
        >
          <Sparkles size={18} />

          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </div>

      {/* AI Result */}

      {analysis && (
        <>
          {/* Resume Score */}

          <div className="bg-white rounded-2xl border p-8">
            <h2 className="text-xl font-semibold">
              Resume Score
            </h2>

            <div className="mt-6 flex items-center gap-8">
              <div className="w-28 h-28 rounded-full border-8 flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {analysis.resumeScore}
                </span>
              </div>

              <div>
                <p className="font-semibold text-lg">
                  ATS Score: {analysis.atsScore}%
                </p>

                <p className="text-gray-500 mt-2">
                  AI-generated evaluation of your resume.
                </p>
              </div>
            </div>
          </div>

          {/* Scores */}

          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white border rounded-2xl p-6">
              <p className="text-gray-500">
                Resume Score
              </p>

              <h3 className="text-3xl font-bold">
                {analysis.resumeScore}%
              </h3>
            </div>

            <div className="bg-white border rounded-2xl p-6">
              <p className="text-gray-500">
                ATS Score
              </p>

              <h3 className="text-3xl font-bold">
                {analysis.atsScore}%
              </h3>
            </div>
          </div>

          {/* Strengths */}

          <div className="bg-white rounded-2xl border p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <CheckCircle className="text-green-600" />

              Strengths
            </h2>

            <ul className="mt-4 space-y-2">
              {analysis.strengths.map(
                (item: string, index: number) => (
                  <li key={index}>
                    ✓ {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Weaknesses */}

          <div className="bg-white rounded-2xl border p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <AlertTriangle className="text-orange-500" />

              Weaknesses
            </h2>

            <ul className="mt-4 space-y-2">
              {analysis.weaknesses.map(
                (item: string, index: number) => (
                  <li key={index}>
                    • {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Missing Skills */}

          <div className="bg-white rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">
              Missing Skills
            </h2>

            <div className="mt-4 flex flex-wrap gap-3">
              {analysis.missingSkills.map(
                (skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Suggestions */}

          <div className="bg-white rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">
              AI Suggestions
            </h2>

            <ul className="mt-4 space-y-2">
              {analysis.suggestions.map(
                (item: string, index: number) => (
                  <li key={index}>
                    • {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Professional Summary */}

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-xl font-semibold">
              AI Professional Summary
            </h2>

            <p className="mt-4 text-gray-700 leading-7">
              {analysis.professionalSummary}
            </p>
          </div>
        </>
      )}
    </div>
  );
}