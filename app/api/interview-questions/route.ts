import { NextResponse } from "next/server";


export async function POST(req: Request) {

  try {


    const {
      role,
      difficulty,
      questionCount
    } = await req.json();



    const prompt = `
Generate ${questionCount} interview questions for this role.

Role:
${role}

Difficulty:
${difficulty}


Return ONLY JSON:

{
 "questions":[
   "Question 1",
   "Question 2",
   "Question 3"
 ]
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

          ],

          temperature:0.7

        })

      }
    );



    const result = await response.json();



    const rawContent =
      result.choices[0].message.content;



    const cleanContent =
      rawContent
      .replace(/```json/g,"")
      .replace(/```/g,"")
      .trim();



    const questions =
      JSON.parse(cleanContent);



    return NextResponse.json({

      success:true,

      questions: JSON.stringify(questions)

    });



  }
  catch(error){


    console.log(error);


    return NextResponse.json({

      success:false,

      message:"Question generation failed"

    });


  }

}