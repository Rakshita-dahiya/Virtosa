import { NextResponse } from "next/server";


export async function POST(req: Request) {

try {


const {
role,
difficulty,
questions,
answers
}=await req.json();


const prompt = `

You are a senior technical interviewer at a top software company.

Evaluate the candidate based ONLY on their actual answers.

Candidate Role:
${role}

Difficulty Level:
${difficulty}


Interview Questions:

${questions.map((q:string,index:number)=>`
Question ${index+1}:
${q}

Candidate Answer:
${answers[index] || "No answer provided"}

`).join("\n")}



Analyze the interview on:

1. Technical accuracy
2. Depth of understanding
3. Problem solving ability
4. Communication quality
5. Practical experience
6. Missing concepts


Give a realistic score from 1-10.


Return ONLY JSON:

{
 "score": 0,

 "strengths": [
   "strength 1",
   "strength 2"
 ],

 "weaknesses": [
   "weakness 1"
 ],

 "improvements": [
   "improvement 1"
 ],

 "questionFeedback": [
   {
     "question": "question text",
     "rating": 0,
     "feedback": "specific feedback about answer"
   }
 ],

 "summary": "overall interview evaluation"
}

`;



const response = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{

method:"POST",

headers:{

"Content-Type":"application/json",

"Authorization":
`Bearer ${process.env.GROQ_API_KEY}`

},


body:JSON.stringify({

model:"llama-3.1-8b-instant",

messages:[
{
role:"user",
content:prompt
}
]

})

});



const result = await response.json();



const content =
result.choices[0].message.content;



const cleanJSON =
content
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();



const feedback =
JSON.parse(cleanJSON);



return NextResponse.json({

success:true,

feedback

});


}
catch(error){


console.log(error);


return NextResponse.json({

success:false,

message:"Feedback generation failed"

});


}

}