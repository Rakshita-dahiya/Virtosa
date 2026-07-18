"use client";

import { useState } from "react";
import {
  Target,
  CheckCircle,
  Lock,
  Play,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function CareerRoadmap() {

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

  const [targetRole, setTargetRole] = useState("");
  const [showRoles, setShowRoles] = useState(false);
  const [loading, setLoading] = useState(false);

  const [roadmap, setRoadmap] = useState<any>(null);

  const [phases, setPhases] = useState<any[]>([]);

  const generateRoadmap = async () => {

    if (!targetRole) {
      alert("Please choose a target role.");
      return;
    }

    try {

      setLoading(true);

      const response = await fetch("/api/career-roadmap", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          targetRole,
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

      setRoadmap(parsed);

      setPhases(parsed.phases);

    } catch (err) {

      console.log(err);

      alert("Failed to generate roadmap.");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="space-y-8">


      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold">
          Career Roadmap
        </h1>

        <p className="text-gray-600 mt-2">
          Your AI-generated learning path to reach your career goal.
        </p>

      </div>







      {/* Goal Card */}

      <div className="bg-white border rounded-2xl p-6">

  <div className="flex items-center gap-3">

    <Target />

    <h2 className="text-xl font-semibold">
      Choose Career Goal
    </h2>

  </div>

  <div className="relative mt-5">

    <input

      value={targetRole}

      onFocus={() => setShowRoles(true)}

      onChange={(e) =>
        setTargetRole(e.target.value)
      }

      placeholder="Search role..."

      className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      "

    />

    {showRoles && (

      <div
        className="
        absolute
        w-full
        mt-2
        bg-white
        border
        rounded-xl
        shadow-lg
        z-20
        "
      >

        {roles
          .filter(role =>
            role
              .toLowerCase()
              .includes(targetRole.toLowerCase())
          )
          .map(role => (

            <button

              key={role}

              onClick={() => {

                setTargetRole(role);

                setShowRoles(false);

              }}

              className="
              block
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
<button

  onClick={generateRoadmap}

  disabled={!targetRole || loading}

  className="
  bg-black
  text-white
  px-6
  py-3
  rounded-xl
  flex
  gap-2
  items-center
  disabled:opacity-50
  "

>

  <Sparkles size={18} />

  {loading ? "Generating..." : "Generate AI Roadmap"}

</button>
{roadmap && (

<div className="bg-white border border-[#E7DFD2] rounded-2xl p-6">

  <div className="flex items-center gap-3">

    <Target size={24}/>

    <h2 className="text-xl font-semibold">
      Career Goal
    </h2>

  </div>

  <div className="mt-5">

    <h3 className="text-2xl font-bold">
      {roadmap.role}
    </h3>

    <p className="text-gray-600 mt-2">
      Current Level: {roadmap.currentLevel}
    </p>

    <p className="text-gray-600">
      Estimated Time: {roadmap.estimatedTime}
    </p>

  </div>

</div>

)}


      {/* Progress */}

      {roadmap && (

<div className="bg-white border rounded-2xl p-6">

  <h2 className="text-xl font-semibold">
    Career Progress
  </h2>

  <div className="mt-5 bg-gray-200 h-3 rounded-full">

    <div

      className="bg-black h-3 rounded-full"

      style={{
        width: `${roadmap.progress}%`,
      }}

    />

  </div>

  <p className="mt-3 text-gray-600">

    {roadmap.progress}% completed

  </p>

</div>

)}







      {/* Roadmap Timeline */}


      <div className="space-y-6">


        {phases.map((phase,index)=>(


          <div
            key={index}
            className="
            bg-white
            border
            rounded-2xl
            p-6
            "
          >


            <div className="flex justify-between items-start">


              <div className="flex gap-4">


                <div className="text-3xl">
                  {phase.icon}
                </div>



                <div>

                  <h2 className="text-xl font-semibold">
                    Phase {index+1}: {phase.title}
                  </h2>



                  <span
                    className={`
                    inline-block
                    mt-2
                    px-3
                    py-1
                    rounded-full
                    text-sm

                    ${
                      phase.status==="completed"
                      ?
                      "bg-green-100 text-green-700"
                      :
                      phase.status==="progress"
                      ?
                      "bg-yellow-100 text-yellow-700"
                      :
                      "bg-gray-100 text-gray-500"
                    }

                    `}
                  >

                    {
                      phase.status==="completed"
                      ?
                      "Completed"
                      :
                      phase.status==="progress"
                      ?
                      "In Progress"
                      :
                      "Locked"
                    }


                  </span>


                </div>


              </div>





              {
                phase.status==="locked"
                ?
                <Lock size={22}/>
                :
                <CheckCircle
                  className={
                    phase.status==="completed"
                    ?
                    "text-green-600"
                    :
                    "text-yellow-600"
                  }
                />
              }



            </div>

           





            {/* Skills */}

            <div className="mt-5 space-y-3">


              {
                phase.skills.map((skill: string)=>(


                  <div
                    key={skill}
                    className="
                    flex
                    items-center
                    gap-3
                    "
                  >


                    {
                      phase.status==="completed"
                      ?
                      <CheckCircle
                        size={18}
                        className="text-green-600"
                      />
                      :
                      <div
                        className="
                        w-4
                        h-4
                        rounded-full
                        border
                        "
                      />
                    }



                    <span>
                      {skill}
                    </span>


                  </div>


                ))
              }



            </div>







            {
              phase.status==="progress" && (

                <button
                  className="
                  mt-6
                  bg-black
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  flex
                  items-center
                  gap-2
                  "
                >

                  <Play size={17}/>

                  Continue Learning

                </button>

              )
            }



          </div>


        ))}


      </div>









      {/* Project Recommendation */}


      <div
        className="
        bg-gradient-to-r
        from-purple-50
        to-blue-50
        rounded-2xl
        p-8
        "
      >


        <div className="flex items-center gap-3">


          <Sparkles/>


          <h2 className="text-xl font-semibold">
            Recommended Project
          </h2>


        </div>





        <h3 className="text-2xl font-bold mt-5">
          Build Full Stack SaaS Dashboard
        </h3>



        <p className="text-gray-600 mt-3">

          Practice authentication, APIs,
          database design and deployment.

        </p>





        <button

          className="
          mt-6
          bg-black
          text-white
          px-6
          py-3
          rounded-xl
          flex
          items-center
          gap-2
          "

        >

          Start Project

          <ArrowRight size={18}/>


        </button>



      </div>







      {/* AI Next Action */}

      <div
        className="
        bg-white
        border
        rounded-2xl
        p-6
        "
      >

        <h2 className="text-xl font-semibold">
          ✨ AI Recommended Next Step
        </h2>


        <p className="text-gray-600 mt-3">

          You completed frontend basics.
          Next, learn backend APIs and connect your projects.

        </p>



        <button
          className="
          mt-5
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
          "
        >

          Start Backend Learning

        </button>


      </div>



    </div>

  );
}