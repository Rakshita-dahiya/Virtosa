import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY_CR,
});

export async function POST(req: NextRequest) {
  try {
    const { targetRole, skills } = await req.json();

    if (!targetRole || !skills || skills.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Target role and skills are required.",
        },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI Career Coach. Return ONLY valid JSON. Never use markdown.",
        },
        {
          role: "user",
          content: `
Target Role:
${targetRole}

Current Skills:
${skills.join(", ")}

Analyze the user's skills and return ONLY this JSON:

{
  "matchPercentage": 0,
  "strengths": [],
  "missingSkills": [],
  "learningPlan": [],
  "recommendedProject": ""
}
          `,
        },
      ],
    });

    const text = completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      analysis: text,
    });
  } catch (error: any) {
    console.error("Skill Gap Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Skill Gap Analysis Failed",
      },
      { status: 500 }
    );
  }
}