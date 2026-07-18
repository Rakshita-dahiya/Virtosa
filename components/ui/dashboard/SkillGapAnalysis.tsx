"use client";

import { useState } from "react";
import {
  Sparkles,
  Plus,
  Target,
  Brain,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function SkillGapAnalysis() {

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Mobile App Developer",
    "UI/UX Designer",
  ];


  const techOptions = [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Python",
    "Java",
    "AWS",
    "Docker",
    "MongoDB",
    "SQL",
    "Git",
    "Firebase",
  ];


  const [targetRole, setTargetRole] = useState("");

  const [skillInput, setSkillInput] = useState("");

  const [skills, setSkills] = useState<string[]>([]);

  const [showRoles, setShowRoles] = useState(false);

  const [showSkills, setShowSkills] = useState(false);

  const [analyzed, setAnalyzed] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);


  const addSkill = (skill:string) => {

    if (!skills.includes(skill)) {

      setSkills([
        ...skills,
        skill
      ]);

    }

    setSkillInput("");

    setShowSkills(false);

  };



  const analyzeSkills = async () => {

  if (!targetRole || skills.length === 0) return;

  try {

    const response = await fetch("/api/skill-gap", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        targetRole,
        skills,
      }),

    });

    const data = await response.json();

    console.log(data);

    if (!data.success) {
      alert(data.message);
      return;
    }

    const cleaned = data.analysis
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    setAnalysis(parsed);

    setAnalyzed(true);

  } catch (error) {

    console.error(error);

    alert("Analysis Failed");

  }

};



  return (

    <div className="space-y-8">


      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold">
          Skill Gap Analysis
        </h1>

        <p className="text-gray-600 mt-2">
          Select your career goal and current skills.
          AI will suggest what you need next.
        </p>

      </div>





      {/* Target Role */}

      <div className="bg-white border rounded-2xl p-6">

        <div className="flex items-center gap-3">

          <Target />

          <h2 className="text-xl font-semibold">
            Target Role
          </h2>

        </div>



        <div className="relative">


          <input

            value={targetRole}

            onFocus={() =>
              setShowRoles(true)
            }

            onChange={(e)=>
              setTargetRole(e.target.value)
            }

            placeholder="Search your target role..."

            className="
            mt-5
            w-full
            border
            rounded-xl
            px-4
            py-3
            outline-none
            "

          />



          {showRoles && (

            <div
              className="
              absolute
              z-20
              bg-white
              border
              rounded-xl
              mt-2
              w-full
              shadow-lg
              overflow-hidden
              "
            >


              {roles
              .filter(role =>
                role
                .toLowerCase()
                .includes(
                  targetRole.toLowerCase()
                )
              )
              .map(role=>(


                <button

                  key={role}

                  onClick={()=>{

                    setTargetRole(role);

                    setShowRoles(false);

                  }}

                  className="
                  w-full
                  text-left
                  px-4
                  py-3
                  hover:bg-gray-100
                  "

                >

                  {role}

                </button>


              ))}


            </div>

          )}


        </div>


      </div>








      {/* Tech Stack */}

      <div className="bg-white border rounded-2xl p-6">


        <div className="flex items-center gap-3">

          <Brain />

          <h2 className="text-xl font-semibold">
            Your Tech Stack
          </h2>

        </div>




        <div className="relative flex gap-3 mt-5">


          <input

            value={skillInput}

            onFocus={() =>
              setShowSkills(true)
            }

            onChange={(e)=>
              setSkillInput(e.target.value)
            }


            placeholder="Search skills..."

            className="
            flex-1
            border
            rounded-xl
            px-4
            py-3
            "

          />



          <button

            onClick={()=>addSkill(skillInput)}

            className="
            bg-black
            text-white
            px-5
            rounded-xl
            "

          >

            <Plus/>

          </button>


        </div>





        {showSkills && (

          <div
            className="
            bg-white
            border
            rounded-xl
            mt-2
            shadow-lg
            "
          >


            {techOptions
            .filter(skill=>
              skill
              .toLowerCase()
              .includes(
                skillInput.toLowerCase()
              )
            )
            .map(skill=>(


              <button

                key={skill}

                onClick={() =>
                  addSkill(skill)
                }


                className="
                block
                w-full
                text-left
                px-4
                py-3
                hover:bg-gray-100
                "

              >

                {skill}

              </button>


            ))}


          </div>

        )}






        {/* Selected Skills */}

        <div className="flex flex-wrap gap-3 mt-5">


          {skills.map(skill=>(


            <span

              key={skill}

              className="
              bg-green-100
              text-green-700
              px-4
              py-2
              rounded-full
              "

            >

              {skill}

            </span>


          ))}


        </div>


      </div>








      {/* Analyze Button */}

      <button

        onClick={analyzeSkills}

        className="
        bg-black
        text-white
        px-7
        py-3
        rounded-xl
        flex
        gap-2
        items-center
        "

      >

        <Sparkles size={18}/>

        Analyze Skill Gap


      </button>








      {/* AI Result */}

      {analyzed && analysis && (

        <div className="space-y-6">



          <div
            className="
            bg-gradient-to-r
            from-purple-50
            to-blue-50
            rounded-2xl
            p-8
            "
          >

            <h2 className="text-2xl font-semibold">
              AI Skill Report
            </h2>


            <div className="mt-5 flex items-center gap-6">


              <div
                className="
                w-28
                h-28
                rounded-full
                border-8
                flex
                items-center
                justify-center
                "
              >

                <span className="text-3xl font-bold">
                  {analysis.matchPercentage}%
                </span>


              </div>


              <p className="text-gray-600">
               Your current skills match the {targetRole} role by {analysis.matchPercentage}%.
              </p>


            </div>


          </div>







          <div className="bg-white border rounded-2xl p-6">


            <h2 className="text-xl font-semibold flex gap-2">

              <CheckCircle className="text-green-600"/>

              Your Strengths

            </h2>


            <div className="mt-4 space-y-2 text-gray-600">

              {analysis.strengths.map((item: string) => (

<p key={item}>
  ✓ {item}
</p>

))}
            </div>


          </div>








          <div className="bg-white border rounded-2xl p-6">


            <h2 className="text-xl font-semibold flex gap-2">

              <AlertTriangle className="text-orange-500"/>

              Missing Skills

            </h2>


            <div className="mt-5 space-y-4">


              
                {analysis.missingSkills.map((skill: string) => (

  <div
    key={skill}
    className="border rounded-xl p-4"
  >
    <h3 className="font-semibold">
      {skill}
    </h3>

    <p className="text-gray-600 text-sm">
      Recommended for becoming a {targetRole}.
    </p>
  </div>

))
              }


            </div>


          </div>








          <div className="bg-white border rounded-2xl p-6">


            <h2 className="text-xl font-semibold">
              AI Learning Plan
            </h2>


            <div className="mt-5 space-y-3">

              {analysis.learningPlan.map((step: string,index:number)=>(

<p key={index}>
  {index+1}. {step}
</p>

))}


            </div>


          </div>








          <div
            className="
            bg-gradient-to-r
            from-purple-50
            to-blue-50
            rounded-2xl
            p-6
            "
          >

            <h2 className="text-xl font-semibold">
              Recommended Project
            </h2>


            <p className="text-gray-600 mt-3">
              {analysis.recommendedProject}
            </p>


            <button
              className="
              mt-5
              bg-black
              text-white
              px-5
              py-3
              rounded-xl
              flex
              gap-2
              items-center
              "
            >

              Start Project

              <ArrowRight size={18}/>

            </button>


          </div>



        </div>

      )}


    </div>

  );
}
