"use client";

import {
  FileText,
  Brain,
  Mic,
  Trophy,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function ProgressTracker() {


  const progressData = [
    {
      title: "Resume",
      icon: FileText,
      score: 90,
      status: "Excellent",
      details: [
        "ATS Friendly",
        "Projects Added",
        "Keywords Improved",
      ],
    },

    {
      title: "Skills",
      icon: Brain,
      score: 65,
      status: "Learning",
      details: [
        "React Completed",
        "Next.js Completed",
        "Docker Needed",
      ],
    },

    {
      title: "Interview",
      icon: Mic,
      score: 82,
      status: "Good",
      details: [
        "Communication Strong",
        "Technical Knowledge Good",
        "Practice System Design",
      ],
    },

  ];



  const achievements = [
    "Resume Optimized",
    "First Mock Interview Completed",
    "10 Skills Added",
    "Career Roadmap Started",
  ];



  return (

    <div className="space-y-8">



      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold">
          Progress Tracker
        </h1>


        <p className="text-gray-600 mt-2">
          Track your career preparation progress with AI insights.
        </p>


      </div>






      {/* Career Score */}


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

          <TrendingUp/>

          <h2 className="text-2xl font-semibold">
            Career Readiness Score
          </h2>


        </div>




        <div className="flex items-center gap-8 mt-8">


          <div
            className="
            w-36
            h-36
            rounded-full
            border-8
            flex
            items-center
            justify-center
            "
          >

            <span className="text-4xl font-bold">
              78%
            </span>


          </div>




          <div>

            <h3 className="text-xl font-semibold">
              You are career ready 🚀
            </h3>


            <p className="text-gray-600 mt-2">

              Keep improving your skills to unlock
              more opportunities.

            </p>


          </div>


        </div>



      </div>








      {/* Progress Cards */}


      <div className="grid md:grid-cols-3 gap-6">


        {
          progressData.map((item,index)=>{


            const Icon=item.icon;


            return (

              <div
                key={index}
                className="
                bg-white
                border
                rounded-2xl
                p-6
                "
              >


                <div className="flex items-center gap-3">


                  <Icon size={24}/>


                  <h2 className="text-xl font-semibold">
                    {item.title}
                  </h2>


                </div>





                <div className="mt-6">


                  <div
                    className="
                    flex
                    justify-between
                    text-sm
                    "
                  >

                    <span>
                      Progress
                    </span>

                    <span>
                      {item.score}%
                    </span>


                  </div>




                  <div
                    className="
                    h-3
                    bg-gray-200
                    rounded-full
                    mt-2
                    "
                  >

                    <div
                      className="
                      h-3
                      bg-black
                      rounded-full
                      "
                      style={{
                        width:`${item.score}%`
                      }}
                    />

                  </div>



                </div>







                <span
                  className="
                  inline-block
                  mt-5
                  bg-green-100
                  text-green-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  "
                >

                  {item.status}

                </span>






                <div className="mt-5 space-y-2">


                  {
                    item.details.map(detail=>(

                      <p
                        key={detail}
                        className="text-gray-600 text-sm"
                      >

                        ✓ {detail}

                      </p>


                    ))
                  }


                </div>




              </div>


            )

          })
        }


      </div>








      {/* Achievements */}


      <div
        className="
        bg-white
        border
        rounded-2xl
        p-6
        "
      >


        <div className="flex items-center gap-3">


          <Trophy/>


          <h2 className="text-xl font-semibold">
            Achievements
          </h2>


        </div>





        <div className="grid md:grid-cols-2 gap-4 mt-5">


          {
            achievements.map((item)=>(


              <div

                key={item}

                className="
                bg-gray-50
                rounded-xl
                p-4
                flex
                items-center
                gap-3
                "

              >

                <Trophy
                  size={20}
                  className="text-yellow-600"
                />

                <span>
                  {item}
                </span>


              </div>


            ))
          }


        </div>


      </div>









      {/* AI Advice */}


      <div
        className="
        bg-gradient-to-r
        from-purple-50
        to-blue-50
        rounded-2xl
        p-6
        "
      >


        <div className="flex gap-3 items-center">


          <Sparkles/>


          <h2 className="text-xl font-semibold">
            AI Career Advice
          </h2>


        </div>




        <p className="text-gray-600 mt-4">

          Your frontend skills are strong.
          To improve your job opportunities,
          focus on backend APIs, cloud deployment,
          and system design.

        </p>



      </div>



    </div>

  );
}
