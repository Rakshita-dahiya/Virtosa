"use client";

import { useState } from "react";
import {
  Target,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function InterviewPractice() {

  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [questionCount, setQuestionCount] = useState(5);

  const [step, setStep] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  const [feedback, setFeedback] = useState<any>(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);


  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Software Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "UI/UX Designer",
  ];



  // Generate Questions

  const generateQuestions = async () => {

    if (!role) {
      alert("Please select a role");
      return;
    }


    setLoading(true);


    try {

      const res = await fetch("/api/interview-questions", {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({

          role,
          difficulty,
          questionCount

        })

      });


      const data = await res.json();


      if(!data.success){

        alert(data.message);

        return;

      }


      let parsed;


      if(typeof data.questions === "string"){

        parsed = JSON.parse(
          data.questions
          .replace(/```json/g,"")
          .replace(/```/g,"")
          .trim()
        );

      }
      else{

        parsed = data.questions;

      }



      setQuestions(parsed.questions);

      setAnswers(
        new Array(parsed.questions.length).fill("")
      );

      setCurrentQuestion(0);

      setAnswer("");

      setStep(2);


    }
    catch(error){

      console.log(error);

      alert("Question generation failed");

    }


    setLoading(false);

  };




  // Save Answer

  const saveAnswer = () => {

    const temp = [...answers];

    temp[currentQuestion] = answer;

    setAnswers(temp);

    return temp;

  };




  // Submit Interview

  const submitInterview = async()=>{


    const finalAnswers=[...answers];

    finalAnswers[currentQuestion]=answer;



    setFeedbackLoading(true);


    try{


      const res = await fetch(
        "/api/interview-feedback",
        {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },


        body:JSON.stringify({

          role,
          difficulty,
          questions,
          answers:finalAnswers

        })

      });



      const data = await res.json();


      console.log(data);



      if(data.success){

        setFeedback(data.feedback);

        setStep(3);

      }
      else{

        alert(data.message);

      }



    }
    catch(error){

      console.log(error);

      alert("Feedback failed");

    }


    setFeedbackLoading(false);


  };






return (

<div className="max-w-5xl mx-auto p-8">



{/* STEP 1 */}

{step===1 && (

<div className="
bg-white
border
rounded-2xl
p-8
shadow-sm
">


<div className="flex items-center gap-3">

<Target className="text-blue-600"/>

<h1 className="text-3xl font-bold">
AI Interview Practice
</h1>

</div>


<p className="text-gray-600 mt-2">
Generate AI interview questions.
</p>



<label className="block mt-8 font-semibold">
Role
</label>


<select

value={role}

onChange={(e)=>setRole(e.target.value)}

className="w-full border rounded-xl p-3 mt-2"

>

<option value="">
Choose Role
</option>


{roles.map((r)=>(

<option key={r}>
{r}
</option>

))}


</select>





<label className="block mt-6 font-semibold">
Difficulty
</label>


<select

value={difficulty}

onChange={(e)=>setDifficulty(e.target.value)}

className="w-full border rounded-xl p-3 mt-2"

>

<option>
Beginner
</option>

<option>
Intermediate
</option>

<option>
Advanced
</option>


</select>





<label className="block mt-6 font-semibold">
Questions
</label>


<select

value={questionCount}

onChange={(e)=>setQuestionCount(Number(e.target.value))}

className="w-full border rounded-xl p-3 mt-2"

>

<option value={3}>
3 Questions
</option>

<option value={5}>
5 Questions
</option>

<option value={10}>
10 Questions
</option>


</select>




<button

onClick={generateQuestions}

disabled={loading}

className="
mt-8
w-full
bg-black
text-white
py-3
rounded-xl
flex
justify-center
gap-2
"

>

<ArrowRight size={18}/>

{
loading
?
"Generating..."
:
"Generate Questions"
}

</button>


</div>

)}






{/* STEP 2 */}

{step===2 && (

<div className="
bg-white
border
rounded-2xl
p-8
shadow-sm
">


<h2 className="text-2xl font-bold">

Question {currentQuestion+1} / {questions.length}

</h2>



<h3 className="text-xl font-semibold mt-8">

{questions[currentQuestion]}

</h3>




<textarea

rows={8}

value={answer}

onChange={(e)=>setAnswer(e.target.value)}

placeholder="Write your answer..."

className="
w-full
border
rounded-xl
p-4
mt-6
"

 />





<div className="flex justify-between mt-8">


<button

disabled={currentQuestion===0}

onClick={()=>{

const temp=saveAnswer();

const prev=currentQuestion-1;

setCurrentQuestion(prev);

setAnswer(temp[prev] || "");

}}

className="
border
px-5
py-3
rounded-xl
"

>

<ChevronLeft size={18}/>

Previous

</button>





{
currentQuestion === questions.length-1

?

<button

onClick={submitInterview}

disabled={feedbackLoading}

className="
bg-black
text-white
px-6
py-3
rounded-xl
"

>

{
feedbackLoading
?
"Analyzing..."
:
"Submit Interview"
}


</button>


:

<button

onClick={()=>{

const temp=saveAnswer();

const next=currentQuestion+1;

setCurrentQuestion(next);

setAnswer(temp[next] || "");

}}

className="
bg-black
text-white
px-6
py-3
rounded-xl
flex
gap-2
"

>

Next

<ChevronRight size={18}/>

</button>

}


</div>


</div>

)}







{/* STEP 3 */}

{step===3 && feedback && (

<div className="
bg-white
border
rounded-2xl
p-8
shadow-sm
">


<h1 className="text-3xl font-bold">
Interview Feedback
</h1>



<h2 className="mt-6 font-bold text-xl">
Score
</h2>


<p className="text-5xl font-bold text-blue-600">

{feedback.score}/10

</p>




<h2 className="mt-8 font-bold text-xl">
Strengths
</h2>


<ul className="list-disc ml-6">

{
feedback.strengths?.map(
(item:string,index:number)=>(

<li key={index}>
{item}
</li>

))
}

</ul>





<h2 className="mt-8 font-bold text-xl">
Improvements
</h2>


<ul className="list-disc ml-6">

{
feedback.improvements?.map(
(item:string,index:number)=>(

<li key={index}>
{item}
</li>

))
}

</ul>





<h2 className="mt-8 font-bold text-xl">
Summary
</h2>


<p className="mt-2 text-gray-700">

{feedback.summary}

</p>



</div>

)}



</div>

);

}